import type { Metadata } from "next";
import NotFoundHero from "@/components/NotFoundHero";

export const metadata: Metadata = { title: "404" };

export default function NotFound() {
  return (
    <main>
      <NotFoundHero />
    </main>
  );
}