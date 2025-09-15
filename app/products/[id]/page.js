"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "next/navigation";

const page = () => {

   const { id } = useParams(); // dynamic route param
  const API_URL = "http://localhost:1337"; // ✅ hardcoded, not from context
  const [products, setProducts]=useState([])

useEffect(() => {
  let isMounted = true; // track mount status
  if (!id) return;

  axios
    .get(`${API_URL}/api/products?filters[id][$eq]=${id}&populate=*`)
    .then((res) => {
      if (isMounted) {
        const data = res.data.data || [];
        setProducts(data);
        console.log("Fetched product is:", data);
      }
    })
    .catch((err) => console.error(err));

  return () => {
    isMounted = false; // cleanup
  };
}, [id]);


  const [quantity, setQuantity] = useState(1);

  // Example product data
  const product = {
    name: "Awesome Product",
    description:
      "This is a detailed description of the product. It explains the features, uses, and benefits in a concise manner. ",
    price: 129.99,
    available: 30,
    image: "/default-avatar.png", // Replace with real product image
  };

  const increaseQuantity = () => {
    if (quantity < product.available) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const totalAmount = (product.price * quantity).toFixed(2);

  return (
    <div className=" flex justify-center px-6">
      <div className="w-full max-w-4xl gap-6">
        {/* Product Image */}
        <div className="p-10 flex-1 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-[400px] h-[300px] rounded-xl shadow-md object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="w-full  flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {product.name}
            </h1>
            <p className="text-gray-600 text-wrap break-all mt-3">{product.description}</p>

            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="text-xl md:text-2xl font-semibold text-green-700">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-gray-500 text-sm">
               Qty ({product.available} available)
              </span>
            </div>
          </div>
        <div className="w-full my-7 flex justify-between items-center">
          {/* Quantity Selector */}
          <div className="mt-6 flex flex-col items-center">
            <div className="my-5 flex items-center border rounded-md overflow-hidden">
              <button
                onClick={decreaseQuantity}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-lg font-bold transition"
              >
                -
              </button>
              <span className="px-3 py-2 text-lg font-medium">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-lg font-bold transition"
              >
                +
              </button>
            </div>

            {/* Total Amount */}
            <div className="mt-4 sm:mt-0 text-lg md:text-xl font-semibold text-blue-700">
              Total: ${totalAmount}
            </div>
          </div>

          {/* Add to Cart Button */}

            <Button className="mt-3 w-[140px] md:w-[200px] h-[35px] md:h-[60px] bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-xl shadow-md transition-all duration-200">
            🛒 Add to Cart
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
