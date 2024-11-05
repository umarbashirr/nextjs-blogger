import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("blogger_token");

  if (token) {
    redirect("/");
  }
  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      {children}
    </div>
  );
};

export default AuthLayout;
