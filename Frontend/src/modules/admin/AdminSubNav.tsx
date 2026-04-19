import { NavLink } from "@/components/NavLink";
import { BarChart3, ClipboardList, MessageSquare, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/admin", label: "Overview", icon: BarChart3, end: true },
  { to: "/admin/complaints", label: "All complaints", icon: ClipboardList, end: false },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare, end: false },
  { to: "/admin/users", label: "Users", icon: Users, end: false },
];

export function AdminSubNav() {
  return (
    <nav
      className="flex flex-wrap gap-1 p-1 rounded-lg bg-muted/50 border mb-6"
      aria-label="Admin module"
    >
      {links.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={cn(
            "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors",
            "hover:bg-background hover:text-foreground"
          )}
          activeClassName="bg-background text-foreground shadow-sm font-medium"
        >
          <Icon className="h-4 w-4 shrink-0" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
