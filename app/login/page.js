"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie"; // ✅ import js-cookie
import { useMyContext } from "@/app/context/MyContext";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const API_URL = "http://localhost:1337";

const Page = () => {
  const { setUser } = useMyContext();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const submitDetails = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        identifier: email,
        password,
      });

      if (res.data.jwt) {
        // ✅ Save JWT in cookie
        Cookies.set("jwt", res.data.jwt, {
          expires: 1, //  refresh token 7 days time
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        setUser(res.data.user); // save user in context
        router.push("/"); // redirect home
      }
    } catch (err) {
      setErrorMsg("Invalid credentials, please try again.");
      console.error(err);
    }
  };

  return (
    <div className="py-16 md:py-30 px-5 flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link href="/register">
              <Button variant="link">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitDetails}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {errorMsg && (
              <p className="text-red-500 text-sm mt-2">{errorMsg}</p>
            )}
            <CardFooter className="flex-col gap-2 px-0 py-4">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
