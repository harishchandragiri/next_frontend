'use client'
import React, { useState } from 'react'
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect } from 'react';
import axios from 'axios';

const Product = () => {

  const API_URL = "http://localhost:1337"; // ✅ hardcoded, not from context
  const [product, setProduct]=useState([])

  useEffect(() => {

    axios
      .get(
        `${API_URL}/api/products?populate=*`
        // ,
        // {
        //   headers: { Authorization: `Bearer ${token}` },
        // }
      )
      .then((res) => {
        const data = res.data.data || [];
        setProduct(data);
        console.log("Fetched products:", data);
      })
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  return (
    <div className='px-1'>
              <div className='mb-7'>
                <div className='flex justify-between items-center'>
                  <h2 className='font-semibold text-3xl my-2 px-3'>Products</h2>
                </div>
                <hr className="my-1  border-gray-300" />
              </div>

<div className='mb-3 flex flex-wrap justify-center md:justify-start'>
  {product.map((prod) => (
    <div key={prod.id}>
    <Link href={`/products/${prod.id}`}>
    <Card className="sm:mx-3 mx-1 my-3 w-[300px] h-[400px] rounded-2xl shadow-lg bg-amber-50 border border-amber-200">
      <CardHeader>
        <div className="w-full flex justify-center rounded-md bg-gradient-to-r from-yellow-100 to-amber-100 shadow-sm">
          <img
          src={
          prod.image
            ? `${API_URL}${prod.image.url}`
            : "/placeholder.png"
           } // full URL
            alt={prod.productName}
            className="w-full h-40 object-cover border-1 rounded-md border-amber-200 shadow-md"
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <CardFooter>
          <CardTitle className="m-1 truncate w-full text-lg font-semibold text-gray-800">
           {prod.productName}
          </CardTitle>
        </CardFooter>

        <CardFooter className="my-1 flex justify-between">
          <CardTitle className="text-green-700 font-semibold m-1 truncate max-w-[140px]">
           $ {prod.Price}
          </CardTitle>
          <CardAction className="m-1 truncate max-w-[120px] text-gray-700 text-sm bg-white rounded-md p-1 shadow-sm">
           Qty: {prod.Quantity}
          </CardAction>
        </CardFooter>
      </CardContent>

      <Button
        variant="outline"
        className="mx-5 mt-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-lg shadow-md rounded-xl transition-all duration-200"
      >
      Buy
      </Button>
    </Card>
    </Link>
    </div>
  ))}
</div>

      
    </div>
  )
}

export default Product