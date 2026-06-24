"use client";

import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Spinner size="lg" color="primary" label="Loading..." />
    </div>
  );
}

