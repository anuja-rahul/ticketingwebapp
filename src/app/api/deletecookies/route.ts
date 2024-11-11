import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
    try{
        const cookieStore = await cookies();
        cookieStore.delete("token");
        cookieStore.delete("username");
        cookieStore.delete("role");

        return NextResponse.json({ message: "Data deleted successfully" }, { status: 204 });
    } catch (error) {
        console.error("RouteError:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}