import Link from "next/link";
import {
  BuildingStorefrontIcon,
  ListBulletIcon,
  ArrowLeftEndOnRectangleIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon,
  ShoppingBagIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Logo from "./Logo";

export default function Nav({ show }) {
  const inactiveLink = "flex items-center text-lg gap-4 p-2";
  const activeLink = inactiveLink + " bg-highlight rounded-md text-black";
  const inactiveIcon = " w-6 h-6";
  const activeIcon = inactiveIcon + " fill-primary";
  const router = useRouter();
  const { pathname } = router;

  async function logout() {
    await router.push("/");
    await signOut();
  }

  return (
    <aside
      className={
        (show ? "left-0" : "-left-full") +
        " text-gray-500 p-4 fixed w-full h-full bg-bgGray top-0 md:static md:w-auto transition-all"
      }
    >
      <div className="mb-5 mr-4">
        <Logo />
      </div>
      <nav className="flex flex-col gap-3">
        <Link href="/" className={pathname === "/" ? activeLink : inactiveLink}>
          <HomeIcon className={pathname === "/" ? activeIcon : inactiveIcon} />
          Dashboard
        </Link>
        <Link
          href="/products"
          className={pathname.includes("/products") ? activeLink : inactiveLink}
        >
          <ListBulletIcon
            className={
              pathname.includes("/products") ? activeIcon : inactiveIcon
            }
          />
          Products
        </Link>
        <Link
          href="/categories"
          className={
            pathname.includes("/categories") ? activeLink : inactiveLink
          }
        >
          <QueueListIcon
            className={
              pathname.includes("/categories") ? activeIcon : inactiveIcon
            }
          />
          Categories
        </Link>
        <Link
          href="/orders"
          className={pathname.includes("/orders") ? activeLink : inactiveLink}
        >
          <ShoppingBagIcon
            className={pathname.includes("/orders") ? activeIcon : inactiveIcon}
          />
          Orders
        </Link>
        <Link
          href="/settings"
          className={pathname.includes("/settings") ? activeLink : inactiveLink}
        >
          <Cog8ToothIcon
            className={
              pathname.includes("/settings") ? activeIcon : inactiveIcon
            }
          />
          Settings
        </Link>
        <button type="button" onClick={logout} className={inactiveLink}>
          <ArrowLeftEndOnRectangleIcon className="w-6 h-6" />
          Logout
        </button>
      </nav>
    </aside>
  );
}
