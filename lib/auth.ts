import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import login from "./login";
import { ILogin } from "@/types/auth.interface";

export interface ISession {
	email: string;
	accessToken: string;
	iat: number;
	exp: number;
	jti: string;
	name: string;
}

export const authOptions: NextAuthOptions = {
	pages: {
		signIn: "/login",
	},
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				username: {
					label: "Username",
					type: "text",
					placeholder: "example@example.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {

				if (!credentials?.username || !credentials.password) {
					return null;
				}
				const response = await login(credentials as ILogin);

				const user = JSON.parse(JSON.stringify(response));

				if (user) {
					return user;
				} else {
					return null;
				}

			}
		}),
	],
	callbacks: {
		session: ({ session, token }) => {
			(session.user as ISession).accessToken = token.accessToken as string;
			(session.user as ISession).email = token.email as string;
			(session.user as ISession).iat = token.iat as number;
			(session.user as ISession).exp = token.exp as number;
			(session.user as ISession).jti = token.jti as string;
			(session.user as ISession).name = (token?.user as any)?.name as string;

			return session;
		},
		jwt: ({ token, user }) => {
			if (user) {
				const u = user as unknown as any;
				return {
					...token,
					...u,
				};
			}
			return token;
		},
	},
};
