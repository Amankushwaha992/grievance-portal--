import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAppStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAppStore();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b bg-card px-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-muted-foreground truncate">
                  Digital Grievance Redressal System
                </span>
                {currentUser?.role === "admin" && (
                  <span className="text-[10px] text-primary font-semibold uppercase tracking-wider">
                    Admin console
                  </span>
                )}
              </div>
            </div>
            {currentUser && (
              <Badge variant="outline" className="text-xs">
                {currentUser.role === "admin" ? "Administrator" : "Citizen"}
              </Badge>
            )}
          </header>
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
