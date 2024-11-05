import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 w-full max-w-screen-2xl mx-auto">
      <Logo />
      <nav className="flex gap-1">
        <Button asChild variant="ghost">
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/about">About</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/contact">Contact</Link>
        </Button>
      </nav>
      <div className="flex gap-2">
        <Button asChild variant="ghost">
          <Link href="/auth/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/auth/register">Get Started</Link>
        </Button>
      </div>
    </div>
  );
};
