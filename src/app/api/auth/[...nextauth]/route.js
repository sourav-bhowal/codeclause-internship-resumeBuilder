import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User.models";
import NextAuth from "next-auth/next";


export const authOptions = NextAuth ({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username"},
                password: { label: "Password", type: "password", placeholder: "password"},
            },

            async authorize(credentials) {

                await dbConnect();

                try {
                    const user = await User.findOne({ username: credentials.identifier });

                    if (!user) {
                        throw new Error("No user found");
                    }

                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                    if (isPasswordValid) {
                        return user;
                    }
                    else {
                        throw new Error("Invalid password");
                    }
                } 
                catch (error) {
                    throw new Error(error);
                }
            }
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.username = token.username;
                session.user.email = token.email;
            }
            return session;
        },

        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.username = user.username;
                token.email = user.email;
            }
            return token;
        }
    },
    pages: {
        signIn: "/sign-in"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
});

export { authOptions as GET, authOptions as POST };