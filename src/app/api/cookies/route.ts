import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

// GET
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const username = cookieStore.get("username");
    const role = cookieStore.get("role");

    return NextResponse.json({ token, username, role }, { status: 200 });
  } catch (error) {
    console.error("RouteError:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

const userDataSchema = z.object({
  token: z.string(),
  username: z.string().email(),
  role: z.string(),
});


// POST
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userData = userDataSchema.parse(body);

    const cookieStore = await cookies();

    for (const [key, value] of Object.entries(userData)) {
      cookieStore.set(key, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24,
      });
    }

    return NextResponse.json(
      { message: "Data saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("RouteError:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


// DELETE
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
