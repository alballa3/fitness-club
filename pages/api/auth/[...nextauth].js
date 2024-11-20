import { connectToDatabase } from "@/lib/db/mongodb";
import User from "@/lib/db/user";
import { compareSync } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "email", label: "Email", placeholder: "Enter Your Email" },
        password: { type: "password", label: "Password", placeholder: "Enter Your Password" },
      },
      authorize: async (credential) => {
        const { email, password } = credential;
        await connectToDatabase();
        const user = await User.findOne({ email });
        if (!user || !compareSync(password, user.password)) {
          throw new Error("The credentials are not valid");
        }
        return { id: user._id.toString(), email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  debug:true,
  secret: "faksgfasgnf",
});
