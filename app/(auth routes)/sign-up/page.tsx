"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/clientApi";
import css from "./SignUpPage.module.css";

export default function SignInPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      await login(email, password); // cookie збережеться браузером
      router.push("/profile");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" required />
      <input
        type="password"
        name="password"
        required
        autoComplete="current-password"
      />
      <button type="submit">Log in</button>
      {error && <p>{error}</p>}
    </form>
  );
}
