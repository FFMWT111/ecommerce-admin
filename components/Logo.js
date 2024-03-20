import Link from "next/link";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";

export default function Logo() {
  return (
    <Link href="/" className="flex gap-2">
      <BuildingStorefrontIcon className="w-6 h-6" />
      <span className="text-lg">EcommerceAdmin</span>
    </Link>
  );
}
