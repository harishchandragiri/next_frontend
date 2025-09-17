'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMyContext } from "@/app/context/MyContext";

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const { user } = useMyContext();
  const API_URL = "http://localhost:1337";

  useEffect(() => {
    if (!user || !user.id) return;
    const token = localStorage.getItem("jwt");
    axios
      .get(
        `${API_URL}/api/carts?populate[products][populate]=image&filters[users_permissions_user][id][$eq]=${user.id}&filters[buy][$eq]=false`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        const transactions = res.data.data;
        setCarts(transactions || []);
        console.log("Fetched carts:", transactions);
      })
      .catch((err) => console.error("Error fetching carts:", err));
  }, [user]);

  if (!user) {
    return <p className="text-center">Loading user data...</p>;
  }

  // ✅ Function to calculate total amount
  const totalAmount = carts.reduce((total, cart) => {
    if (cart.products && cart.products.length > 0) {
      cart.products.forEach((product) => {
        total += cart.quantity * (product.Price || 0);
      });
    }
    return total;
  }, 0);

  const Buy = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("You must be logged in to make a purchase.");
      return;
    }
   try {
      await axios.delete(`${API_URL}/api/carts/${documentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove deleted cart from state
      setCarts((prev) => prev.filter((cart) => cart.documentId !== documentId));

      console.log("Deleted cart:", documentId);
    } catch (err) {
      console.error("Error deleting cart:", err);
    }
    // Add your buy logic here
  };

  

  // ✅ Fixed delete function (uses documentId instead of id)
  const handleDelete = async (documentId) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("You must be logged in to delete a cart item.");
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/carts/${documentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove deleted cart from state
      setCarts((prev) => prev.filter((cart) => cart.documentId !== documentId));

      console.log("Deleted cart:", documentId);
    } catch (err) {
      console.error("Error deleting cart:", err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-3xl my-2 px-3 lg:px-0">Products</h2>
        <Button onClick={Buy} className="mx-3 w-24">Buy</Button>
      </div>
      <hr className="my-1 border-gray-300" />

      <Table>
        <TableCaption>A list of your recent transactions (Total Buy).</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Photo</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {carts.length > 0 ? (
            carts.map((cart) => {
              const Product = cart.products?.[0];
              if (!Product) return null;

              const productName = Product.productName || "N/A";
              const price = Product.Price || 0;
              const quantity = cart.quantity;
              const image = Product.image?.url;

              return (
                <TableRow key={cart.documentId}>
                  <TableCell className="px-2 flex items-center">
                    <img
                      src={image ? `${API_URL}${image}` : "/default-avatar.png"}
                      alt={productName}
                      className="w-10 h-10 object-cover rounded-full border-2 border-gray-200 shadow-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{productName}</TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>${price}</TableCell>
                  <TableCell className="flex justify-end items-center h-full">
                    <button
                      onClick={() => handleDelete(cart.documentId)}
                      className="flex items-center text-red-600 hover:text-red-800"
                    >
                      <Trash2 />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500">
                No transactions found (No Buy Records)
              </TableCell>
            </TableRow>
          )}
          {/* Display Total Amount */}
          <TableRow>
            <TableCell colSpan={5} className="text-center font-semibold text-lg">
              Total Amount : ${totalAmount}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Cart;
