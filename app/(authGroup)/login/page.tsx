"use client";

import Link from "next/link";
import { Building2 } from "lucide-react";
import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center  px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-xl border  p-6 shadow-lg sm:p-8">
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-bold text-xl"
          >
            <Building2 className="h-6 w-6 text-green-600" />
            <span>
              Rent<span className="text-green-600">Nest</span>
            </span>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        <LoginForm />

        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
