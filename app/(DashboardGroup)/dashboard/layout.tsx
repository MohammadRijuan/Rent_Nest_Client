import type { ReactNode } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "../_components/dashboardSidebar";
import DashboardHeader from "../_components/dashboardHeader";
import { getProfile } from "@/app/(PublicGroup)/_actions/profileAction";
import BrandMark from "@/components/shared/brandMark";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const result = await getProfile();
  const user = result.success ? result.user : null;

  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full bg-[#f7f6f0]">
        <DashboardSidebar user={user} />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex min-h-14 items-center gap-3 border-b border-[#e3e1d7] bg-[#fbfaf6] px-4 sm:px-6 lg:hidden">
            <SidebarTrigger aria-label="Toggle navigation" />
            <span className="truncate">
              <BrandMark className="scale-90 origin-left" />
            </span>
          </header>

          <main className="dashboard-theme min-w-0 flex-1 p-4 sm:p-6 lg:p-9">
            <DashboardHeader user={user} />
            <div className="w-full min-w-0">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}