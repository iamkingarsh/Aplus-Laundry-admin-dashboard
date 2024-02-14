"use client"

import { fetchData } from "@/axiosUtility/api";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
    {
        name: "Jan",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Feb",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Mar",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Apr",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "May",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Jun",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Jul",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Aug",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Sep",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Oct",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Nov",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Dec",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
]

export function RevenueGraph() {
    const [weeklySalesData, setWeeklySalesData] = useState([] as any[]);
    useEffect(() => {
        const getTotalRevenue = async () => {
            try {
                const response = await fetchData('/transaction/getall');
                const response2 = await fetchData('/subscription/transactions');
                const transactions = response.transactions;
                const transactions2 = response2.transactions;

                // Get the last 7 days including today
                const endDate = new Date();
                const startDate = new Date(endDate);
                startDate.setDate(startDate.getDate() - 6);

                // Create an array of dates for the last 7 days
                const dateRange = getDateRange(startDate, endDate);

                // Populate weekly sales data with transaction amounts for each date
                const weeklySalesArray = dateRange.map(date => {
                    const dateKey = date.toISOString().slice(0, 10); // Use date as key
                    const total = transactions
                        .filter((transaction: { createdAt: string; }) => transaction.createdAt && transaction.createdAt.slice(0, 10) === dateKey)
                        .reduce((acc: any, transaction: { amount: any; }) => acc + transaction.amount, 0);
                    const total2 = transactions2
                        .filter((transaction: { createdAt: string; }) => transaction.createdAt && transaction.createdAt.slice(0, 10) === dateKey)
                        .reduce((acc: any, transaction: { amount: any; }) => acc + transaction.amount, 0);
                    return { date, total: total + total2 };
                }) as any[];


                setWeeklySalesData(weeklySalesArray);
            } catch (error) {
                console.error('Error fetching transaction data:', error);
            }
        };

        getTotalRevenue();
    }, []);

    // Function to generate an array of dates for the last 7 days
    const getDateRange = (startDate: string | number | Date, endDate: number | Date) => {
        const dateRange = [];
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            dateRange.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        }
        return dateRange;
    };


    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={weeklySalesData}>
                <XAxis
                    dataKey="date"
                    tickFormatter={(date) => {
                        const month = date.toLocaleString('default', { month: 'short' });
                        const day = date.getDate();
                        return `${month} ${day}`;
                    }}
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value / 100)}`}
                />
                <Bar dataKey="total" fill="#2e3190" radius={[8, 8, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}