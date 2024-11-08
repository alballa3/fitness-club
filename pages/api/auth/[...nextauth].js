import { connectToDatabase } from "@/lib/db/mongodb";
import User from "@/lib/db/user";
import { compareSync } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "credential",
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "Enter Your Email",
        },
        password: {
          type: "password",
          label: "passowrd",
          placeholder: "Enter Your Password",
        },
      },

      authorize: async (credential) => {
        const { email, password } = credential;
        await connectToDatabase();
        const user = await User.findOne({
          email: email,
        })
        if (!user || !compareSync(password, user.password)) {
          throw new Error("The credentials are not valid");
        }
        return user;
      },
    }),
  ],
  debug:true,
  secret:"mfaksfjnkhbh41241"
});
