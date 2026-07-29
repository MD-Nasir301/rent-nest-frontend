import { toast } from "sonner";

export const showErrorToast = (error: any) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong! Please try again.";

  toast.error("Error!", {
    description: message,
  });
};