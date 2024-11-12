import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const username = cookieStore.get("username")?.value;
    const role = cookieStore.get("role")?.value;

    if (token == undefined || username == undefined || role == undefined) {
      return NextResponse.json({ valid: false }, { status: 400 });
    } else {
      return NextResponse.json({ valid: true }, { status: 200 });
    }
  } catch (error) {
    console.error("RouteError:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
