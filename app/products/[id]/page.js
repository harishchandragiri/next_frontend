"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import { useMyContext } from "@/app/context/MyContext";
import { useRouter } from "next/navigation";

const Page = () => {
  const { id } = useParams(); // dynamic route param
  const API_URL = process.env.NEXT_PUBLIC_API; // ✅ hardcoded
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user, setUser } = useMyContext();
  const router = useRouter();

   const productId = product?.id || "unknown";
   const userId = user?.id || "unknown";
  //  const productPrice = product?.Price || 0; // Ensure Price is defined

  useEffect(() => {
    let isMounted = true;
    if (!id) return;

    axios
      .get(`${API_URL}/api/products?filters[id][$eq]=${id}&populate=*`)
      .then((res) => {
        if (isMounted) {
          const data = res.data.data?.[0] || null;
          setProduct(data);
          console.log("Fetched product is:", data);
        }
      })
      .catch((err) => console.error(err));

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // Safe quantity control
  const increaseQuantity = () => {
    if (quantity < product.Quantity) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // ✅ Use correct field name: Price (not price)
  const totalAmount = product.Price
    ? (product.Price * quantity).toFixed(2)
    : "0.00";

  const imageUrl = product.image
    ? `${product.image.url}`
    : "/placeholder.png";

  // console.log("User in product page:", user);
  // console.log("Product details:", { productId, userId, quantity, totalAmount });

  const handleUpload = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setUser(null);
      return;
    }
    try {
    const payload = {
      data: {
        products: productId,          // ✅ product relation
        users_permissions_user: userId, // ✅ user relation
        quantity: quantity,           // ✅ number
      },
    };

    const res = await axios.post(`${API_URL}/api/carts`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Cart item added:", res.data);

    const remaningstock = product.Quantity - quantity;
    console.log("Remaining stock:", remaningstock);

  const payload2 = {
  data: {
    Quantity: remaningstock, // or quantity if lowercase in Strapi
  },
  };

    const res1 = await axios.put(`${API_URL}/api/products/${product.documentId}`, payload2, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Cart item added:", res1.data);
    alert("Product added to cart!");
    // ✅ Redirect to home
    router.push("/cart");

  } catch (error) {
    console.error("Error adding to cart:", error.response?.data || error.message);
  }
  }

  return (
    <div className="flex justify-center px-6">
      <div className="w-full max-w-4xl gap-6">
        {/* Product Image */}
        <div className="p-10 flex-1 flex justify-center items-center">
          <img
            src={imageUrl}
            alt={product.productName}
            className="w-[400px] h-[300px] rounded-xl shadow-md object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="w-full flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {product.productName}
            </h1>
            <p className="text-gray-600 break-words mt-3">
              {product.description || "No description available."}
            </p>

            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="text-xl md:text-2xl font-semibold text-green-700">
                ${product.Price?.toFixed(2)}
              </span>
              <span className="text-gray-500 text-sm">
                Qty ({product.Quantity} available)
              </span>
            </div>
          </div>

          {/* Quantity Selector + Total */}
          <div className="w-full my-7 flex justify-between items-center">
            <div className="mt-6 flex flex-col items-center">
              <div className="my-5 flex items-center border rounded-md overflow-hidden">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-lg font-bold transition"
                >
                  -
                </button>
                <span className="px-3 py-2 text-lg font-medium">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-lg font-bold transition"
                >
                  +
                </button>
              </div>

              <div className="mt-4 sm:mt-0 text-lg md:text-xl font-semibold text-blue-700">
                Total: ${totalAmount}
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button onClick={handleUpload} className="mt-3 w-[140px] md:w-[200px] h-[35px] md:h-[60px] bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-xl shadow-md transition-all duration-200">
              🛒 Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
