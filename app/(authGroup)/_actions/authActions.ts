"use server";

import { LoginState, RegisterState } from "@/types/type";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginAction = async (
  prevState: LoginState,
  formData: FormData,
) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const payload = {
    email,
    password,
  };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      const cookieStore = await cookies();

      cookieStore.set("accessToken", result.data.accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });
      cookieStore.set("refreshToken", result.data.refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
      });

      const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

      if (decodedToken.role === "LANDLORD") {
        redirect("/landlord-dashboard");
      } else if (decodedToken.role === "ADMIN") {
        redirect("/admin-dashboard");
      } else if (decodedToken.role === "TENANT") {
        redirect("/tenant-dashboard");
      }
    }

    return result;
  } catch (error) {
    if ((error as Error).message === "NEXT_REDIRECT") {
      throw error;
    }
    return {
      success: false,
      message: "Server issue or connection failed. Please try again!",
    };
  }
};

export const registerAction = async (
  prevState: RegisterState,
  formData: FormData,
) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;
  const password = formData.get("password") as string;

  const payload = {
    name,
    email,
    role,
    password,
  };
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Registration failed. Please try again.",
      };
    }


    return {
      success: true,
      message: result.message || "Account created successfully!",
    };
  } catch (error) {
    console.error("Register Action Error:", error);
    return {
      success: false,
      message: "Something went wrong. Please check your network connection.",
    };
  }
};
