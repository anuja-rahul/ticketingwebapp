import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = getCookiesToken(request);
  const role = getCookiesRole(request);

  if (!token || !role) {
    return NextResponse.redirect(
      new URL("/auth?reason=no_token_or_role", request.url)
    );
  }

  const url = new URL(request.url);
  const path = url.pathname;

  // VENDOR
  if (role.value === "VENDOR" && path.startsWith("/tickets/sell")) {
    return NextResponse.next();
  }

  // CUSTOMER
  if (
    role.value === "CUSTOMER" &&
    (path.startsWith("/tickets/buy") || path === "/vendors")
  ) {
    return NextResponse.next();
  }

  if (path === "/user") {
    return NextResponse.next();
  }

  // ADMIN
  if (role.value === "ADMIN" && (path === "/users" || path === "/dashboard")) {
    return NextResponse.next();
  }

  return NextResponse.redirect(
    new URL("/auth?reason=unauthorized", request.url)
  );
}

export const config = {
  matcher: ["/tickets/:path*", "/user", "/vendors", "/users", "/dashboard"],
};

function getCookiesToken(request: NextRequest) {
  const cookieToken = request.cookies.get("token");
  return cookieToken;
}

function getCookiesRole(request: NextRequest) {
  const roleToken = request.cookies.get("role");
  return roleToken;
}
