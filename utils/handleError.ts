import { toast } from "@/components/ui/toast";


export const showErrorToast = (error: any) => {

  const message =
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong! Please try again.";

  toast({
    variant: "destructive", 
    title: "Error!",
    description: message,
  });
};