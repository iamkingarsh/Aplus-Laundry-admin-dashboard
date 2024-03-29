import Order from '../models/order.js';
import Razorpay from 'razorpay';
import Transaction from '../models/transacation.js';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});
// Add or update an order
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
        } = req.body;

        const existingOrder = await Order.findById(id);

        if (existingOrder) {
            existingOrder.order_type = order_type;
            existingOrder.service = service;
            existingOrder.products = products;
            existingOrder.customer = customer;
            existingOrder.status = status;
            existingOrder.payment = payment;
            existingOrder.delivery_agent = delivery_agent;
            existingOrder.cartTotal = cartTotal;
            existingOrder.cartWeight = cartWeight;
            existingOrder.cartWeightBy = cartWeightBy;

            existingOrder.coupon_id = coupon_id;
            existingOrder.address_id = address_id;

   
            await existingOrder.save();

            return res.status(200).json({
                message: 'Order updated successfully',
                order: existingOrder,
            });
        } else {
            //generate cutsom order id of 8 digits eg AL + Year + random 4 digit number
            const customOrderId = `AL${new Date().getFullYear()}${Math.floor(1000 + Math.random() * 9000)}`;
            const newOrder = new Order({
                order_id: customOrderId,
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
                coupon_id,
                address_id

            });

            const options = {
                amount: cartTotal * 100, // Amount in paise
                currency: 'INR',
                receipt: 'order_receipt_' + newOrder._id, // You can customize the receipt ID as needed
            };

            try {
                // Create a new Razorpay order
                const order = await razorpay.orders.create(options);
                newOrder.razorpayOrderId = order.id; // Save Razorpay order ID in your Order model
                await newOrder.save();

                return res.status(201).json({
                    message: 'Order created successfully',
                    order: newOrder,
                    razorpayOrder: order,
                });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
        });
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


// export const savePayment = async (req, res) => {
//     try {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderid } = req.body;
//         // const body = razorpay_order_id + "|" + razorpay_payment_id;
//         console.log("id==", razorpay_order_id, razorpay_payment_id, razorpay_signature);

//         const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
//         console.log("Payment Details:", paymentDetails);




//         await transaction.save();


//         res.status(200).json({ success: true, message: 'Payment details saved successfully' });

//     } catch (error) {
//         console.error('Error saving payment:', error);
//         res.status(500).json({ success: false, message: 'Error saving payment' });
//     }
// };


export const savePayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderid } = req.body;

        const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
        console.log("Payment Details:", paymentDetails);

        const transaction = new Transaction({
            payment_id: razorpay_payment_id,
            razorpay_signature,
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

        const existingOrder = await Order.findById(id);

        if (!existingOrder) {
            return res.status(404).json({
                message: 'Order not found',
                ok: false
            });
        }

        existingOrder.status = status;
        await existingOrder.save();


        return res.status(200).json({
            message: 'Order status updated successfully',
            order: updatedOrder
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};








