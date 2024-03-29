import Order from "../models/order.js";
import Razorpay from "razorpay";
import Transaction from "../models/transacation.js";
import Service from "../models/service.js";
import User from "../models/user.js";
import Subscription from "../models/subscription.js";
import SubscriptionTransaction from "../models/subscriptionTransaction.js";
import mongoose from "mongoose";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});
// Add or update an order

export const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        await req.json();
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log("id==", body);

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        console.log(Payment);

        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        //  return NextResponse.redirect(new URL('/paymentsuccess', req.url));
    } else {
        return NextResponse.json(
            {
                message: "fail",
            },
            {
                status: 400,
            }
        );
    }

    return NextResponse.json(
        {
            message: "success",
        },
        {
            status: 200,
        }
    );
};

// export const savePayment = async (req, res) => {
//     try {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//             req.body;
//         // const body = razorpay_order_id + "|" + razorpay_payment_id;
//         console.log(
//             "id==",
//             razorpay_order_id,
//             razorpay_payment_id,
//             razorpay_signature
//         );

//         const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
//         console.log("Payment Details:", paymentDetails); 
//         const transaction = new Transaction({
//             payment_id: razorpay_payment_id,
//             entity: paymentDetails.entity,
//             amount: paymentDetails.amount,
//             currency: paymentDetails.currency,
//             status: paymentDetails.status,
//             razorpay_order_id: paymentDetails.order_id,
//             method: paymentDetails.method,
//             captured: paymentDetails.captured,
//             card_id: paymentDetails.card_id,
//             bank: paymentDetails.bank,
//             wallet: paymentDetails.wallet,
//             vpa: paymentDetails.vpa,
//             fee: paymentDetails.fee,
//             tax: paymentDetails.tax,
//             error_code: paymentDetails.error_code,
//             error_description: paymentDetails.error_description,
//             acquirer_data: {
//                 rrn: paymentDetails.acquirer_data.rrn,
//                 upi_transaction_id: paymentDetails.acquirer_data.upi_transaction_id,
//             },
//             created_at: paymentDetails.created_at,
//             upi: {
//                 vpa: paymentDetails.upi.vpa,
//             },
//         });

//         await transaction.save();

//         res
//             .status(200)
//             .json({ success: true, message: "Payment details fetched successfully" });
//     } catch (error) {
//         console.error("Error saving payment:", error);
//         res.status(500).json({ success: false, message: "Error saving payment" });
//     }
// };

export const createPlan = async (req, res) => {
    const { period, interval, item, service_id, kids_qty, adult_qty, user_id } = req.body;
    console.log('req.body', req.body)

    try {
        // Check if a subscription with the provided details already exists
        const existingSubscription = await Subscription.findOne({
            period,
            kids_qty,
            adult_qty,
            service_id
        });
        console.log('existingSubscription', existingSubscription)

        if (existingSubscription) {
            const fetchPlan = await razorpay.plans.fetch(existingSubscription.razorpay_plan_id);
            return res.status(200).json({
                message: "Subscription already exists",
                subscription: existingSubscription,
                plan: fetchPlan
            });
        }
        // Create Razorpay plan
        const plan = await razorpay.plans.create({
            period: period,
            interval: interval,
            item: {
                name: item.name,
                amount: item.amount,
                currency: "INR",
                description: item.description,
            },
            notes: {
                service_id,
                kids_qty,
                adult_qty,
                user_id
            },
        });

        // Update the user's customerType to 'subscriber'
        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            { customerType: 'subscriber' },
            { new: true }
        );

        // Create a new subscription record
        const subscription = new Subscription({
            period,
            kids_qty,
            adult_qty,
            service_id,
            razorpay_plan_id: plan.id,
        });
        await subscription.save();

        return res.status(200).json({
            message: "Plan Created successfully",
            plan: plan,
            updatedUser: updatedUser,
            subscription: subscription // Include the created subscription in the response
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};
export const getAllPlans = async (req, res) => {
    //     try {
    //         const plans = await razorpay.plans.all();
    // console.log('plansplansplansplansplansplansplansplansplans',plans)
    //         const enrichedPlans = await Promise.all(plans.items.map(async (plan) => {
    //             const serviceId = plan.notes.service_id;
    //             const serviceData = await Service.findById(serviceId);



    //         //     return {
    //         //         ...plan,
    //         //         serviceData: serviceData || null,
    //         //     };
    //         // }));

    //         console.log("Enriched Plans:", plans);

    //         return res.status(200).json({
    //             plans: plans,
    //             ok: true,
    //         });
    //     }}} catch (error) {
    //         console.error(error);
    //         return res.status(500).json({
    //             error: "Internal Server Error",
    //             ok: false,
    //         });
    //     }

    try {
        const plans = await razorpay.plans.all();
        return res.status(200).json({
            plans: plans,
            ok: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal Server Error",
            ok: false,
        });
    }
};


export const deletePlan = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: 'Plan ID is required' });
        }

        const deletedPlan = await razorpay.plans.delete(id);

        return res.status(200).json({
            success: true,
            message: 'Plan deleted successfully',
            data: deletedPlan,
        });
    } catch (error) {
        console.error('Error deleting plan:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};



// export const getAllSubscriptionPlans = async (req, res) => {
//     try {
//         // const orders = await Order.find()
//         //     .populate('service', 'serviceTitle')
//         //     .populate('products.id', 'product_name')
//         // .populate('customer', 'fullName')
//         // .populate('delivery_agent', 'fullName')
//         // .execPopulate();

//         return res.status(200).json({
//             orders,
//             ok: true
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             error: 'Internal Server Error',
//             ok: false
//         });
//     }
// };

// export const getSubscriptionPlanById = async (req, res) => {
//     try {
//         const {
//             id
//         } = req.params;
//         return res.status(200).json({

//             ok: true
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             error: 'Internal Server Error',
//             ok: false
//         });
//     }
// };

// export const deletSubscriptionPlanById = async (req, res) => {
//     try {
//         const {
//             id
//         } = req.params;

//         // Find the Order by ID and remove it

//         return res.status(200).json({

//             ok: true
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             error: 'Internal Server Error',
//             ok: false
//         });
//     }
// };

// export const updateSubscriptionPlanById = async (req, res) => {
//     try {
//         const {
//             id
//         } = req.params;
//         const {
//             status
//         } = req.body;
//         return res.status(200).json({
//             message: 'Order status updated successfully',
//             order: updatedOrder
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             error: 'Internal Server Error'
//         });
//     }
// };

export const createSubscriptionCheckout = async (req, res) => {
    try {
        // Validate the request body
        //   const errors = validationResult(req);
        //   if (!errors.isEmpty()) {
        //     return res.status(400).json({ success: false, errors: errors.array() });
        //   }

        const {
            plan_id,
            quantity,
            addons,
            addonQuantity,
            total_count,
            notes
        } = req.body;
        console.log("req.body", req.body);

        // Create subscription payload
        const subscriptionPayload = {
            plan_id,
            quantity,
            total_count,
            addons,
            notes,
        };
        // Create subscription using Razorpay instance
        razorpay.subscriptions.create(
            subscriptionPayload,
            (error, subscription) => {
                if (error) {
                    console.error(error);
                    return res
                        .status(500)
                        .json({ success: false, message: "Subscription creation failed" });
                }

                return res
                    .status(201)
                    .json({
                        success: true,
                        message: "Subscription created successfully",
                        data: subscription,
                    });
            }
        );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};




export const saveSubscriptionPayment = async (req, res) => {
    try {

        const { razorpay_plan_id, razorpay_payment_id, razorpay_signature, subscription_id, customer_id, razorpay_subscription_id, } = req.body;


        const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
        const SubscriptionTransactionDetails = await razorpay.subscriptions.fetch(razorpay_subscription_id);
 console.log("paymentDetails ",paymentDetails)
 console.log("SubscriptionTransactionDetails ",SubscriptionTransactionDetails)

        // Create a new subscription transaction
        const transaction = new SubscriptionTransaction({
            payment_id: razorpay_payment_id,
            customer_id,
            razorpay_signature,
            entity: paymentDetails.entity,
            amount: paymentDetails.amount,
            currency: paymentDetails.currency,
            status: paymentDetails.status,
            razorpay_plan_id,
            razorpay_subscription_id,
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
            short_url:SubscriptionTransactionDetails.short_url,
            upi: {
                vpa: paymentDetails.upi.vpa,
            },
        });

        // Save the transaction
        const savedTransaction = await transaction.save();


        console.log('savedTransaction', savedTransaction)


        // Find the subscription document by its ID and update its subscriptionTransaction_id array
        const updatedSubscription = await Subscription.findByIdAndUpdate(
            subscription_id,
            { $push: { subscriptionTransaction_id: savedTransaction._id } },
            { new: true }
        );

        console.log('updatedSubscription', updatedSubscription)
        // Update the customerType of the user to 'subscriber'
        const updatedUser = await User.findByIdAndUpdate(
            customer_id,
            {
                customerType: 'subscriber',
                subscription_id: subscription_id, // Update subscription end date

            },
            { new: true }
        );

        res.status(200).json({ success: true, message: 'Payment details saved successfully', updatedUser, subscription: updatedSubscription });
    } catch (error) {
        console.error('Error saving payment:', error);
        res.status(500).json({ success: false, message: 'Error saving payment' });
    }
};






export const fetchSubscribers = async (req, res) => {
    try {
        // Set subscription end date
        const subscriptionEndDate = new Date('2024-02-12T14:00:00');

        // Update all users with role 'customer' to be subscribers and set subscriptionEndDate
        await User.updateMany(
            { role: 'customer' },
            { $set: { customerType: 'subscriber', subscriptionEndDate: subscriptionEndDate } }
        );

        // Fetch all subscribers after update
        const subscribers = await User.find({ customerType: 'subscriber' });

        res.status(200).json({ success: true, subscribers });
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        res.status(500).json({ success: false, message: 'Error fetching subscribers' });
    }
};