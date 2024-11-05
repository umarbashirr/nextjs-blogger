import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { PageBreadCrumb } from "./_components/page-breadcrumb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("blogger_token")?.value;

  if (!token) {
    return redirect("/auth/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <PageBreadCrumb />
          <Button className="ml-auto" size="sm">
            <Link href="/admin/posts/create">Write a blog</Link>
          </Button>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
