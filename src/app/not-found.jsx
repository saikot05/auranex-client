"use client";

import { Button } from "@heroui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950 text-center px-4">
      <h1 className="text-9xl font-black text-blue-600">404</h1>
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-4">Page Not Found</h2>
      <p className="text-zinc-500 dark:text-zinc-400 mt-2 mb-8">Oops! The page you are looking for does not exist.</p>
      
      <Link href="/">
        <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold" size="lg">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}