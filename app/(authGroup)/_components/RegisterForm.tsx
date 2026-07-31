"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@base-ui/react/input";
import { useActionState, useEffect, useRef } from "react";
import { registerAction } from "../_actions/authActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const initialState = {
  success: false,
  message: "",
};

const RegisterForm = () => {
  const [state, action, pending] = useActionState(registerAction, initialState);

  const router = useRouter();
  const prevSuccess = useRef(false);

  useEffect(() => {
    if (!state) return;

    if (state.success && !prevSuccess.current) {
      toast.success(state.message || "Account created successfully!");
      router.push("/login");
    }

    if (!state.success && state.message) {
      toast.error(state.message || "Failed to register, Please try again");
    }

    prevSuccess.current = state.success;
  }, [state, router]);

  return (
    <div>
      <form action={action} className="space-y-4">
        <Card className="p-5 space-y-4">
          <Input
            className="p-3 rounded-lg border border-blue-200 bg-sky-100"
            name="name"
            type="text"
            placeholder="Enter Your Name"
            required
          />
          <Input
            className="p-3 rounded-lg border border-blue-200 bg-sky-100"
            name="email"
            type="email"
            placeholder="Enter Your Email"
            required
          />
          <select
            name="role"
            defaultValue=""
            required
            className="w-full p-3 rounded-lg border border-blue-200 bg-sky-100 outline-none text-gray-700"
          >
            <option value="" disabled>
              Select Your Role
            </option>
            <option value="TENANT">Tenant</option>
            <option value="LANDLORD">Landlord</option>
          </select>
          <Input
            className="p-3 rounded-lg border border-blue-200 bg-sky-100"
            name="password"
            type="password"
            placeholder="Create a strong password"
            required
          />
          <Button type="submit">
            {pending ? "Submitting..." : "Register"}
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default RegisterForm;
