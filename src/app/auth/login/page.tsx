import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { LoginForm } from "../_components/login-form";

const LoginPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Welcome back! We are glad to see you again
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center">
        <p className="text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
