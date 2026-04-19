import { DashboardLayout } from "@/components/DashboardLayout";
import { AdminSubNav } from "./AdminSubNav";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Admin module
        </p>
        <AdminSubNav />
        {children}
      </div>
    </DashboardLayout>
  );
}
