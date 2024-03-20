import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/pages/libs/mongodbClient";

const adminEmails = ["jurieyes11@gmail.com"];

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
};
export default NextAuth(authOptions);

export async function isAdminRequest(request, response) {
  const session = await getServerSession(request, response, authOptions);
  if (!adminEmails.includes(session?.user?.email)) {
    response.status(401);
    response.end();
    throw "not an admin";
  }
}
