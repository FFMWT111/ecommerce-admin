import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="flex justify-between text-blue-900">
        <h2>
          Hello,<b>{session?.user.name}</b>
        </h2>
        <div className="flex items-center bg-gray-300 gap-1 rounded-lg overflow-hidden text-black">
          <img src={session?.user.image} alt="avatar" className="w-8 h-8" />
          <span className="py-1 px-2">{session?.user.name}</span>
        </div>
      </div>
    </Layout>
  );
}
