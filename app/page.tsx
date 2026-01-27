import { HomePage } from "@/components/home";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div />}>
      <HomePage />
    </Suspense>
  );
}
