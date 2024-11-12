import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get("token");
        const username = cookieStore.get("username");
        const role = cookieStore.get("role");

        return NextResponse.json({ token, username, role }, { status: 200 });
    } catch (error) {
        console.error("RouteError:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}