"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMyContext } from "@/app/context/MyContext";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Transaction = () => {
  const { user } = useMyContext(); // ✅ only use user from context
  const [transactions, setTransactions] = useState([]);

  const API_URL = "http://localhost:1337"; // ✅ hardcoded, not from context

  useEffect(() => {
    if (!user) return; // wait until user is loaded

    const token = localStorage.getItem("jwt"); // still needed for auth headers
    if (!token) return;

    axios
      .get(
        `${API_URL}/api/transactions?filters[user][id][$eq]=${user.id}&populate=*`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        const data = res.data.data || [];
        setTransactions(data);
      })
      .catch((err) => console.error("Error fetching transactions:", err));
  }, [user]);

  return (
    <div className="w-full">
      <h2 className="text-[25px] font-semibold my-2">Transactions</h2>
      <Table>
        <TableCaption>
          A list of your recent transactions (Total Buy).
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Sold Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.product}
                </TableCell>
                <TableCell>{item.Quantity}</TableCell>
                <TableCell>${item.Price}</TableCell>
                <TableCell className="text-right">
                  {new Date(item.soldDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No transactions found (No Buy Records)
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Transaction;
