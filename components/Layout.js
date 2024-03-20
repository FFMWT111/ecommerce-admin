import { signIn, useSession } from "next-auth/react";
import Nav from "./Nav";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();

  function handleGoogleLogin(e) {
    e.preventDefault();
    e.stopPropagation();
    signIn("google");
  }

  if (!session) {
    return (
      <div className="flex items-center bg-bgGray w-screen h-screen">
        <div className="text-center w-full">
          <button
            onClick={handleGoogleLogin}
            className="bg-white p-2 px-4 rounded-lg"
          >
            <img src={""} />
            Login with google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgGray min-h-screen">
      <div className="flex items-center md:hidden p-3">
        <button onClick={() => setShowNav(true)}>
          <Bars3Icon className="w-6 h-6" />
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Nav show={showNav} />
        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  );
}
