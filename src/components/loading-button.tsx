import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingButtonProps {
  isLoading: boolean;
  label: string;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

export const LoadingButton = ({
  isLoading,
  label,
  className,
  children,
  type = "submit",
}: LoadingButtonProps) => {
  return (
    <Button
      type={type}
      className={cn("w-full", className)}
      disabled={isLoading}
    >
      {isLoading && (
        <Loader2 className="w-4 h-4 animate-spin duration-500 repeat-infinite" />
      )}
      {isLoading ? label : children}
    </Button>
  );
};
