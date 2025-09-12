"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMyContext } from "@/app/context/MyContext";
import { useRouter } from "next/navigation";
import axios from "axios";
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

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const submitDetails = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      // 1️⃣ Register the user
      await axios.post(
        `${API_URL}/api/auth/local/register`,
        { username, email, password },
        { withCredentials: true }
      );

      // 2️⃣ Auto-login after registration
      // const loginRes = await axios.post(
      //   `${API_URL}/api/auth/login`,
      //   { identifier: email, password }, // Strapi login expects "identifier" (username/email) & password
      //   { withCredentials: true }
      // );

// /api/auth/login

      const loginRes = await axios.post(
        `${API_URL}/api/auth/login`,
        { identifier: email, password },
        { withCredentials: true } // IMPORTANT: allows browser to store cookie
      );





      // ✅ Save user in context and redirect
      setUser(loginRes.data.user);
      router.push("/"); 
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);

      if (err.response?.data?.error?.message) {
        setErrorMsg(err.response.data.error.message);
      } else {
        setErrorMsg("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="py-16 md:py-24 px-5 flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register your account</CardTitle>
          <CardDescription>
            Enter your username, email, and password to create an account
          </CardDescription>
          <CardAction>
            <Link href="/login">
              <Button variant="link">Login</Button>
            </Link>
          </CardAction>
        </CardHeader>

        <form onSubmit={submitDetails}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="john_doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>

          {errorMsg && (
            <p className="text-red-500 text-sm mt-2 text-center">{errorMsg}</p>
          )}

          <CardFooter className="flex-col mt-5">
            <Button type="submit" className="w-full">
              Register
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Page;
