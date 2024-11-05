import { cookies } from "next/headers";
import { Navbar } from "./_components/navbar";

const WebsiteLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("blogger_token")?.value || "";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar token={token} />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default WebsiteLayout;
