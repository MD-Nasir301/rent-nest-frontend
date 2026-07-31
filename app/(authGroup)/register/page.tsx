import { Building2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";
import RegisterForm from "../_components/RegisterForm";

const registerPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center  px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-xl border  p-6 shadow-lg sm:p-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight ">
            Welcome to{" "}
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-xl"
            >
              <Building2Icon className="h-6 w-6 text-green-600" />
              <span className="mt-2">
                Rent<span className="text-green-600">Nest</span>
              </span>
            </Link>
          </h1>
          <p className="text-sm text-muted-foreground">
            Create an account to get started
          </p>
        </div>
        <RegisterForm />
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default registerPage;
