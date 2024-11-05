"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { handleLogout } from "@/app/auth/auth.service";

export const Navbar = ({ token }: { token: string }) => {
  const pathname = usePathname();
  const routes = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  return (
    <div className="flex justify-between items-center p-4 w-full max-w-screen-2xl mx-auto">
      <Logo />
      <nav className="flex gap-1">
        {routes.map((route) => (
          <Button
            key={route.href}
            asChild
            variant={pathname === route.href ? "default" : "ghost"}
          >
            <Link href={route.href}>{route.label}</Link>
          </Button>
        ))}
      </nav>
      {!token ? (
        <div className="flex gap-2">
          <Button asChild variant="ghost">
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/register">Get Started</Link>
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin">Go to Dashboard</Link>
          </Button>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};
