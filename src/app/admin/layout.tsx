import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/hub/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0c] text-white">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader user={session.user} />
        <main className="p-6 pt-24">{children}</main>
      </div>
    </div>
  );
}
