import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { redirect } from "next/navigation";
import { HubSidebar } from "@/components/hub/HubSidebar";
import { HubHeader } from "@/components/hub/HubHeader";
import { SSEProvider } from "@/components/hub/SSEProvider";

export default async function HubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/hub/login");

  return (
    <SSEProvider>
      <div className="flex min-h-screen bg-[#0a0a0c] text-white">
        <HubSidebar role={(session.user as any).role} />
        <div className="flex-1 ml-64">
          <HubHeader user={session.user} />
          <main className="p-6 pt-24">{children}</main>
        </div>
      </div>
    </SSEProvider>
  );
}
