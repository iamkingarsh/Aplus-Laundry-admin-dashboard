import Transaction from "../models/transacation.js"


// export const createOrUpdateTransaction = async (req, res) => {
//     try {
//         const {
//         id,
//         order,
//         razorpay_payment_id,
//         razorpay_order_id,
//         razorpay_signature,
//         status,
//         } = req.body;

//         const existingTransaction = await Transaction.findById(id);

//         if (existingTransaction) {
//         existingTransaction.order = order;
//         existingTransaction.razorpay_payment_id = razorpay_payment_id;
//         existingTransaction.razorpay_order_id = razorpay_order_id;
//         existingTransaction.razorpay_signature = razorpay_signature;
//         existingTransaction.status = status;

//         await existingTransaction.save();

//         return res.status(200).json({
//             message: "Transaction updated successfully",
//             transaction: existingTransaction,
//         });
//         } else {
//         const newTransaction = new Transaction({
//             order,
//             razorpay_payment_id,
//             razorpay_order_id,
//             razorpay_signature,
//             status,
//         });

//         await newTransaction.save();

//         return res.status(201).json({
//             message: "Transaction created successfully",
//             transaction: newTransaction,
//         });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//         error: "Internal Server Error",
//         });
//     }
//     };


export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        return res.status(200).json({
            transactions,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

export const getTransactionsById = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const existingTransaction = await Transaction.findById(id);

        if (!existingTransaction) {
            return res.status(404).json({
                message: 'Transaction not found',
            });
        }

        return res.status(200).json({
            transaction: existingTransaction,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

export const deleteTransactionById = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return res.status(404).json({
                message: 'Transaction not found',
                ok: false
            });
        }

        return res.status(200).json({
            message: 'Transaction deleted successfully',
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
