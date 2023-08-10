import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
const handler = async function (request: Request) {
	const session = await getServerSession(authOptions);
	if (!session) {
		return redirect("/login");
	}

	return NextResponse.json({
		authenticated: !!session,
		session,
	});
}
export { handler as GET, handler as POST };
