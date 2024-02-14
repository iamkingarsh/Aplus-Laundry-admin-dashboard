"use client"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DownloadIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { columns } from './components/columns';
import { fetchData } from '@/axiosUtility/api';


export default function Page() {

    const [transactionData, setTransactionData] = useState([])

    const getTransactionData = async () => {
        try {
            const res = await fetchData('/transaction/getall')
            const transactions = res.transactions
            console.log(transactions)
            setTransactionData(transactions)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTransactionData()
        console.log('tykty', transactionData)
    }, [])

    const TransactionData = [
        {
            "id": "txn_00000000000001",
            "entity": "transaction",
            "account_number": "1121431121541121",
            "amount": 400,
            "currency": "INR",
            "credit": 400,
            "debit": 0,
            "balance": 10000000,
            "source": {
                "id": "bt_00000000000001",
                "entity": "bank_transfer",
                "payer_name": "Saurav Kumar",
                "payer_account": "6543266545411243",
                "payer_ifsc": "UTIB0000002",
                "mode": "NEFT",
                "bank_reference": "AXIR000000000001",
                "amount": 400
            },
            "created_at": 1545125568
        },
        {
            "id": "txn_00000000000001",
            "entity": "transaction",
            "account_number": "1121431121541121",
            "amount": 400,
            "currency": "INR",
            "credit": 400,
            "debit": 0,
            "balance": 10000000,
            "source": {
                "id": "bt_00000000000001",
                "entity": "bank_transfer",
                "payer_name": "Saurav Kumar",
                "payer_account": "6543266545411243",
                "payer_ifsc": "UTIB0000002",
                "mode": "NEFT",
                "bank_reference": "AXIR000000000001",
                "amount": 400
            },
            "created_at": 1545125568
        },
        {
            "id": "txn_00000000000001",
            "entity": "transaction",
            "account_number": "1121431121541121",
            "amount": 400,
            "currency": "INR",
            "credit": 400,
            "debit": 0,
            "balance": 10000000,
            "source": {
                "id": "bt_00000000000001",
                "entity": "bank_transfer",
                "payer_name": "Saurav Kumar",
                "payer_account": "6543266545411243",
                "payer_ifsc": "UTIB0000002",
                "mode": "NEFT",
                "bank_reference": "AXIR000000000001",
                "amount": 400
            },
            "created_at": 1545125568
        },
        {
            "id": "txn_00000000000001",
            "entity": "transaction",
            "account_number": "1121431121541121",
            "amount": 400,
            "currency": "INR",
            "credit": 400,
            "debit": 0,
            "balance": 10000000,
            "source": {
                "id": "bt_00000000000001",
                "entity": "bank_transfer",
                "payer_name": "Saurav Kumar",
                "payer_account": "6543266545411243",
                "payer_ifsc": "UTIB0000002",
                "mode": "NEFT",
                "bank_reference": "AXIR000000000001",
                "amount": 400
            },
            "created_at": 1545125568
        },
        {
            "id": "txn_00000000000001",
            "entity": "transaction",
            "account_number": "1121431121541121",
            "amount": 400,
            "currency": "INR",
            "credit": 400,
            "debit": 0,
            "balance": 10000000,
            "source": {
                "id": "bt_00000000000001",
                "entity": "bank_transfer",
                "payer_name": "Saurav Kumar",
                "payer_account": "6543266545411243",
                "payer_ifsc": "UTIB0000002",
                "mode": "NEFT",
                "bank_reference": "AXIR000000000001",
                "amount": 400
            },
            "created_at": 1545125568
        },
        {
            "id": "txn_00000000000001",
            "entity": "transaction",
            "account_number": "1121431121541121",
            "amount": 90000,
            "currency": "INR",
            "credit": 90000,
            "debit": 0,
            "balance": 10000000,
            "source": {
                "id": "bt_00000000000001",
                "entity": "bank_transfer",
                "payer_name": "Saurav Kumar",
                "payer_account": "6543266545411243",
                "payer_ifsc": "UTIB0000002",
                "mode": "NEFT",
                "bank_reference": "AXIR000000000001",
                "amount": 400
            },
            "created_at": 1545125568
        },
        {
            "id": "txn_00000000000001",
            "entity": "transaction",
            "account_number": "1121431121541121",
            "amount": 400,
            "currency": "INR",
            "credit": 400,
            "debit": 0,
            "balance": 10000000,
            "source": {
                "id": "bt_00000000000001",
                "entity": "bank_transfer",
                "payer_name": "Saurav Kumar",
                "payer_account": "6543266545411243",
                "payer_ifsc": "UTIB0000002",
                "mode": "NEFT",
                "bank_reference": "AXIR000000000001",
                "amount": 400
            },
            "created_at": 1545125568
        },
        {
            "id": "txn_00000000000003",
            "entity": "transaction",
            "account_number": "7878780080316316",
            "amount": 200,
            "currency": "INR",
            "credit": 0,
            "debit": 200,
            "balance": 9000000,
            "source": {
                "id": "pout_00000000000001",
                "entity": "payout",
                "fund_account_id": "fa_00000000000001",
                "amount": 200,
                "payer_name": "Mujahed",
                "notes": {
                    "notes_key_1": "Tea, Earl Grey, Hot",
                    "notes_key_2": "Tea, Earl Grey… decaf."
                },
                "fees": 3,
                "tax": 1,
                "status": "processed",
                "utr": "000000000001",
                "mode": "NEFT",
                "created_at": 1545224066,
                "fee_type": null
            },
            "created_at": 1545224066
        },
        {
            "id": "txn_00000000000003",
            "entity": "transaction",
            "account_number": "7878780080316316",
            "amount": 200,
            "currency": "INR",
            "credit": 0,
            "debit": 20000,
            "balance": 9000000,
            "source": {
                "id": "pout_00000000000001",
                "entity": "payout",
                "fund_account_id": "fa_00000000000001",
                "amount": 20000,
                "payer_name": "Mujahed",
                "notes": {
                    "notes_key_1": "Tea, Earl Grey, Hot",
                    "notes_key_2": "Tea, Earl Grey… decaf."
                },
                "fees": 3,
                "tax": 1,
                "status": "processed",
                "utr": "000000000001",
                "mode": "NEFT",
                "created_at": 1545224066,
                "fee_type": null
            },
            "created_at": 1545224066
        },
        {
            "id": "txn_00000000000003",
            "entity": "transaction",
            "account_number": "7878780080316316",
            "amount": 200,
            "currency": "INR",
            "credit": 0,
            "debit": 20000,
            "balance": 9000000,
            "source": {
                "id": "pout_00000000000001",
                "entity": "payout",
                "fund_account_id": "fa_00000000000001",
                "amount": 20000,
                "payer_name": "Mujahed",
                "notes": {
                    "notes_key_1": "Tea, Earl Grey, Hot",
                    "notes_key_2": "Tea, Earl Grey… decaf."
                },
                "fees": 3,
                "tax": 1,
                "status": "processed",
                "utr": "000000000001",
                "mode": "NEFT",
                "created_at": 1545224066,
                "fee_type": null
            },
            "created_at": 1545224066
        },
        {
            "id": "txn_00000000000003",
            "entity": "transaction",
            "account_number": "7878780080316316",
            "amount": 200,
            "currency": "INR",
            "credit": 0,
            "debit": 200,
            "balance": 9000000,
            "source": {
                "id": "pout_00000000000001",
                "entity": "payout",
                "fund_account_id": "fa_00000000000001",
                "amount": 200,
                "payer_name": "Mujahed",
                "notes": {
                    "notes_key_1": "Tea, Earl Grey, Hot",
                    "notes_key_2": "Tea, Earl Grey… decaf."
                },
                "fees": 3,
                "tax": 1,
                "status": "processed",
                "utr": "000000000001",
                "mode": "NEFT",
                "created_at": 1545224066,
                "fee_type": null
            },
            "created_at": 1545224066
        },
    ] as any



    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col' >
            <div className="topbar w-full flex justify-between items-center">
                <div>
                    <Heading className='leading-tight' title='Your Revenue' />
                    <p className='text-muted-foreground text-sm'>Manage Your Revenue Here! </p>
                </div>

                <Button variant='default'>Download Statement <DownloadIcon className='w-4 ml-2' /></Button>

            </div>

            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">

                <DataTable
                    bulkDeleteIdName='couponid'
                    bulkDeleteTitle='Are you sure you want to delete these Coupons?'
                    bulkDeleteDescription='This will delete the selected Coupons, and they will not be recoverable.'
                    bulkDeleteToastMessage='Selected Coupons Deleted Successfully'
                    searchKey='amount' columns={columns} data={TransactionData} />


            </div>
        </div >
    )
}

