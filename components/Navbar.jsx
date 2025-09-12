"use client";

import { useRouter } from "next/navigation";
import { useMyContext } from "@/app/context/MyContext";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useMyContext(); // ✅ use context logout
  const router = useRouter();

  const handleLogout = () => {
    logout(); // clears jwt + user
    router.push("/login");
  };

  return (
    <nav className="py-4 shadow-sm bg-white">
      <div className="flex justify-between items-center px-[25px]">
        {/* Logo */}
        <div className="text-xl font-bold">MyApp</div>

        {/* Desktop Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/cart">Cart</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {user ? (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/users">Profile</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 font-medium"
                  >
                    Logout
                  </button>
                </NavigationMenuItem>
              </>
            ) : (
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/login">Login</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/70 z-10"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-64 bg-white p-6 z-20 shadow-sm flex flex-col gap-4">
            <button
              onClick={() => setIsOpen(false)}
              className="self-end p-2 mb-4"
            >
              <X size={24} />
            </button>
            <Link href="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/cart" onClick={() => setIsOpen(false)}>
              Cart
            </Link>

            {user ? (
              <>
                <Link href="/users" onClick={() => setIsOpen(false)}>
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-red-500 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
