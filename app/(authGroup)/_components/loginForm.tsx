"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@base-ui/react/input";
import { useActionState, useEffect } from "react";
import { loginAction } from "../_actions/authActions";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const [state, action, pending] = useActionState(loginAction, false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!state) return;
    if (!state.success) {
      toast.error(state.message || "Login failed");
    }
  }, [state]);

  useEffect(() => {
    const registered = searchParams.get("registered");

    if (registered === "true") {
      toast.success("Registered successfully! Please login.", {
        id: "register-success-toast",
      });
    }
  }, [searchParams]);

  return (
    <div>
      <form action={action} className="space-y-4">
        <Card className="p-5 space-y-4">
          <Input
            className="p-3 rounded-lg border border-blue-200 bg-sky-100"
            name="email"
            type="email"
            placeholder="Enter Your Email"
            required
          />
          <Input
            className="p-3 rounded-lg border border-blue-200 bg-sky-100"
            name="password"
            type="password"
            placeholder="Enter Your Password"
            required
          />
          <Button type="submit" disabled={pending}>
            {pending ? "Submitting..." : "Login"}
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default LoginForm;
