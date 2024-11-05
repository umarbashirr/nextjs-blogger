import { toast } from "sonner";

export const handleLogout = async () => {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });
    if (response.ok) {
      toast.success("Logged out successfully");
      location.href = "/auth/login";
    }
  } catch (error: any) {
    console.error(error);
    toast.error("Something went wrong");
  }
};
