import Order from '../models/order.js';
import Razorpay from 'razorpay';
import Transaction from '../models/transacation.js';
import { orderConfirmationEmail, orderStatusUpdateEmail } from '../config/sendMail.js';
 

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});
// Add or update an order
 
export const createOrUpdateOrderRazorpay = async (req, res) => {
    try {
        const { 
            cartTotal, 
        } = req.body;

        const options = {
            amount: cartTotal * 100, // Amount in paise
            currency: 'INR',
 
            // receipt: 'order_receipt_' + newOrder._id, // You can customize the receipt ID as needed
 
        };
        // Create a new Razorpay order
        const order = await razorpay.orders.create(options);
        

        return res.status(201).json({
            message: 'Razorpay Order created successfully', 
            razorpayOrder: order,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

 
export const createOrUpdateOrder = async (req, res) => {
    try {
        const {
            id,
            coupon_id,
            address_id,
            order_type,
            service,
            products,
            customer,
            status,
            payment,
            delivery_agent,
            cartTotal,
            cartWeight,
            cartWeightBy, 
            razorpayOrderId,
            order_id
        } = req.body;

 
        let updatedOrder;

        if (id) {
            // Update existing document
            const update = {
                order_type,
                service,
                products,
                customer,
                status,
                payment,
                cartTotal,
                cartWeight,
                cartWeightBy,
                coupon_id,
                address_id,
                order_id: order_id || `AL${new Date().getFullYear()}${Math.floor(1000 + Math.random() * 9000)}`
            };

            // Conditionally include the delivery_agent field if it's provided
            if (delivery_agent) {
                update.delivery_agent = delivery_agent;
            }

              // Conditionally include the razorpayOrderId field if it's provided
        if (razorpayOrderId) {
            updateFields.razorpayOrderId = razorpayOrderId;
        }


            const options = {
                new: true, // Return the modified document rather than the original
                upsert: true // Create a new document if no document matches the query
            };

            updatedOrder = await Order.findByIdAndUpdate(id, update, options);
        } else {
            // Create new document
            updatedOrder = new Order({
                order_type,
                service,
                products,
                customer,
                status,
                payment,
                cartTotal,
                cartWeight,
                cartWeightBy,
                coupon_id,
                address_id,
                order_id: order_id || `AL${new Date().getFullYear()}${Math.floor(1000 + Math.random() * 9000)}`,
                orderDate: new Date(),
        createdAt: new Date() 
            });

            await updatedOrder.save();
        }

        console.log('updatedOrder', updatedOrder);
        sendOrderConfirmationEmail(updatedOrder, cartTotal, status);
        res.status(id ? 200 : 201).json({
            message: id ? 'Order updated successfully' : 'Order created successfully',
            order: updatedOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




 
 

const sendOrderConfirmationEmail = async (updatedOrder_id,cartTotal,status) => {
    try {
        // Fetch the order details from the database and populate related fields
        const order = await Order.findById(updatedOrder_id)
            .populate({
                path: 'service',
                select: 'serviceTitle'
            })
            .populate('customer', 'fullName email')
            .populate('coupon_id')
            .populate('address_id')
            .populate('products.id')
            .exec(); 
        if (!order) {
            throw new Error('Order not found');
        }

        // Prepare order details for the email
        const orderDetails = {
            orderId: order.order_id,
            orderDate: order.orderDate,
            service: order.service?.serviceTitle,
            laundryItems: order.products.map(item => ({
                name: item.id.product_name,
                quantity: item.quantity,
                price: item.id.priceperpair
            })),
            totalAmount: cartTotal,
            orderType: order.order_type ,
            totalAmountPaid: cartTotal ,
            status,
        };

        // Send order confirmation email
        await orderConfirmationEmail(order.customer.email, orderDetails);
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        // Handle the error accordingly (e.g., log it, send a notification, etc.)
 
    }
};

export const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log("id==", body)

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;


    if (isAuthentic) {

        console.log(Payment)



        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        //  return NextResponse.redirect(new URL('/paymentsuccess', req.url));

    } else {
        return NextResponse.json({
            message: "fail"
        }, {
            status: 400,
        })

    }


    return NextResponse.json({
        message: "success"
    }, {
        status: 200,
    })

}




export const savePayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderid, customer_id } = req.body;

        const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
        console.log("Payment Details:", paymentDetails);

        const transaction = new Transaction({
            payment_id: razorpay_payment_id,
            razorpay_signature,
            customer_id,
            entity: paymentDetails.entity,
            amount: paymentDetails.amount,
            currency: paymentDetails.currency,
            status: paymentDetails.status,
            razorpay_order_id,
            method: paymentDetails.method,
            captured: paymentDetails.captured,
            card_id: paymentDetails.card_id,
            bank: paymentDetails.bank,
            wallet: paymentDetails.wallet,
            vpa: paymentDetails.vpa,
            fee: paymentDetails.fee,
            tax: paymentDetails.tax,
            error_code: paymentDetails.error_code,
            error_description: paymentDetails.error_description,
            acquirer_data: {
                rrn: paymentDetails.acquirer_data.rrn,
                upi_transaction_id: paymentDetails.acquirer_data.upi_transaction_id,
            },
            created_at: paymentDetails.created_at,
            upi: {
                vpa: paymentDetails.upi.vpa,
            },

        });

        const savedTransaction = await transaction.save();

        // Update the corresponding order document with the transaction ID
        await Order.findOneAndUpdate(
            { _id: orderid },
            { $set: { transaction_id: savedTransaction._id } },
            { new: true }
        );

        res.status(200).json({ success: true, message: 'Payment details saved successfully' });

    } catch (error) {
        console.error('Error saving payment:', error);
        res.status(500).json({ success: false, message: 'Error saving payment' });
    }
};

export const saveOfflinePayment = async (req, res) => {
    try { 
        
        const {   orderid, customer , cartTotal,payment } = req.body;

         

        const transaction = new Transaction({
             
            customer_id: customer,
            entity: "payment",
            amount: cartTotal,
            status: "captured",
            method: payment,
             

        });

        const savedTransaction = await transaction.save();

        // Update the corresponding order document with the transaction ID
        await Order.findOneAndUpdate(
            { _id: orderid },
            { $set: { transaction_id: savedTransaction._id } },
            { new: true }
        );

        res.status(200).json({ success: true, message: 'Payment details saved successfully' });

    } catch (error) {
        console.error('Error saving payment:', error);
        res.status(500).json({ success: false, message: 'Error saving payment' });
    }
};
// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('service', 'serviceTitle')
            .populate('products.id', 'product_name')
            .populate('customer', 'fullName mobileNumber')
            .populate('coupon_id', null, { _id: { $exists: true } }) // Populate coupon_id only if it exists
            .populate('address_id') // Populate address_id
            .exec();

        // console.log(orders.products.map((product) => product));
        const ordersWithCustomerNames = orders.map((order) => ({
            ...order.toObject(),
            customer_name: order.customer?.fullName || 'N/A',
            mobile: order.customer?.mobileNumber || 'N/A',
            payment_method: order.payment
        }));

        return res.status(200).json({
            orders: ordersWithCustomerNames,
            ok: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            ok: false,
        });
    }
};




// Get a specific order by its ID
export const getOrderById = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const order = await Order.findById(id)
            .populate('products.id')
            .populate({
                path: 'products.id',
                populate: {
                    path: 'category',
                    model: 'Category'
                }
            })
            .populate('service', 'serviceTitle')
            .populate('customer', 'fullName mobileNumber')

            .populate('coupon_id', null, { _id: { $exists: true } }) // Populate coupon_id only if it exists
            .populate('address_id') // Populate address_id
            .exec();

        // .populate('customer', 'fullName')
        // .execPopulate();
        console.log(order);

        if (!order) {
            return res.status(404).json({
                message: 'Order not found',
                ok: false
            });
        }

        return res.status(200).json({
            order,
            ok: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            ok: false
        });
    }
};

// Delete an order by its ID
export const deleteOrderById = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        // Find the Order by ID and remove it
        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({
                message: 'Order not found',
                ok: false
            });
        }

        return res.status(200).json({
            message: 'Order deleted successfully',
            ok: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            ok: false
        });
    }
};


// Update the status of an order by its ID
export const updateOrderStatusById = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            status
        } = req.body;

        const existingOrder = await Order.findById(id)
        .populate('customer', 'fullName email') 
        .exec(); 

        if (!existingOrder) {
            return res.status(404).json({
                message: 'Order not found',
                ok: false
            });
        }

        existingOrder.status = status;
        await existingOrder.save();

        const orderDetails = {
            orderId: existingOrder.order_id, 
            status,
        };

        orderStatusUpdateEmail(existingOrder.customer.email,orderDetails)

        
        return res.status(200).json({
            message: 'Order status updated successfully',
            order: existingOrder
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const {
            userId
        } = req.params;

        const orders = await Order.find({
            customer: userId
        })
            .populate('service', 'serviceTitle')
            .populate('products.id', 'product_name')
            .populate('coupon_id', null, {
                _id: {
                    $exists: true
                }
            }) // Populate coupon_id only if it exists
            .populate('address_id') // Populate address_id
            .exec();

        return res.status(200).json({
            orders,
            ok: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            ok: false
        });
    }
}







