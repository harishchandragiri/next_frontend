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
  const { user } = useMyContext(); // only use user from context
  const [transactions, setTransactions] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API; // hardcoded API URL

  // Fetch transactions for the current user
  useEffect(() => {
    if (!user) return; // wait until user is loaded

    const token = localStorage.getItem("jwt");
    if (!token) return;

    axios
      .get(
        `${API_URL}/api/carts?filters[buy][$eq]=true&filters[users_permissions_user][id][$eq]=${user.id}&populate=productName.image`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        const data = res.data.data || [];
        setTransactions(data);
        console.log("Fetched transactions:", data);
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
            transactions.map((item) => {
              const product = item.productName;
              const productName = product?.productName || "N/A";
              const quantity = item.quantity || 0;
              const price = product?.Price || 0;
              const soldDate = item.updatedAt || item.createdAt;

              return (
                <TableRow key={item.documentId}>
                  <TableCell className="font-medium">{productName}</TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>${price}</TableCell>
                  <TableCell className="text-right">
                    {new Date(soldDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              );
            })
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
