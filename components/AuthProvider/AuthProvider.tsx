"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { getMe } from "@/lib/api/clientApi";
import { usePathname, useRouter } from "next/navigation";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const { setUser, clearAuth } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkSession() {
      try {
        const user = await getMe();
        setUser(user);
      } catch {
        clearAuth();
        if (pathname.startsWith("/profile")) {
          router.push("/sign-in");
        }
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, [pathname, setUser, clearAuth, router]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
