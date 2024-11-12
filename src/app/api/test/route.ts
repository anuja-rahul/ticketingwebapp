import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ valid: true }, { status: 200 });
  } catch (error) {
    console.error("RouteError:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
