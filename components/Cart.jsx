'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const Cart = () => {

  const [users, setUsers] = useState([]); // make it an empty array so .map() won't break

  const API_URL = "http://localhost:1337";

  // Fetch profile data
  useEffect(() => {
    axios
      .get(`${API_URL}/api/transactions?filters[user][id][$eq]=4&populate=*`)
      .then((res) => {
        const transactions = res.data.data;
        if (transactions && transactions.length > 0) {
          setUsers(transactions);
        } else {
          console.warn("No transactions found!!");
        }
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  return (
    <div>
      <div >
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-3xl my-2 px-3 lg:px-0'>Products</h2>
          <Button className={'mx-3 w-24'}>Buy</Button>
        </div>
        <hr className="my-1  border-gray-300" />
      </div>
              <Table>
              <TableCaption>A list of your recent transactions( Total Buy ).</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Sold Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 ? (
                  users.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className={'px-2 flex items-center'}>      
                         <img
                             src={
                                item.image
                                 ? `${API_URL}${item.image.formats.large.url}`
                                 : "/default-avatar.png"
                             }
                             alt="Profile"
                             className="w-10 h-10 object-cover rounded-full border-2 border-gray-200 shadow-md"
                           />
                      </TableCell>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell>{item.Quantity}</TableCell>
                      <TableCell>${item.Price}</TableCell>
                      <TableCell className="text-right">
                        {new Date(item.soldDate).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500">
                      No transactions found ( No Buy Records )
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
    </div>
  )
}

export default Cart