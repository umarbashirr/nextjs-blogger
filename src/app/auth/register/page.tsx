import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { RegisterForm } from "../_components/register-form";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Fill in the form below and start creating your own blogs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;
