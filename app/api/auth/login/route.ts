import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Відправляємо на бекенд
    const res = await api.post("/auth/login", body, { withCredentials: true });

    // Беремо cookies з відповіді бекенду
    const setCookieHeader = res.headers["set-cookie"];
    const response = NextResponse.json(res.data, { status: 200 });

    if (setCookieHeader) {
      // Proxy cookie через Next.js Route Handler
      response.headers.set("set-cookie", setCookieHeader as unknown as string);
    }

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Login failed" }, { status: 401 });
  }
}
