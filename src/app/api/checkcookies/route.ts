import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const username = cookieStore.get("username")?.value;
    const role = cookieStore.get("role")?.value;

    if (
      token &&
      token.length > 3 &&
      username &&
      username.length > 3 &&
      role &&
      role.length > 3
    ) {
      return NextResponse.json({ token, username, role }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "One or more cookies have insufficient length" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("RouteError:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
