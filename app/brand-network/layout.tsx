import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brands & Network",
  description: "Explore Anchal India’s Ailyn and Harkes brands and its connected automotive component network.",
  alternates: { canonical: "/brand-network" },
};

export default function BrandNetworkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
