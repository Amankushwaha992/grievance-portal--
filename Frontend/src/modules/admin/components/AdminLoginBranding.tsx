import { ShieldCheck } from "lucide-react";

export function AdminLoginBranding() {
  return (
    <div className="text-center mb-8 animate-fade-in">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/15 ring-2 ring-primary/25 mb-4">
        <ShieldCheck className="h-9 w-9 text-primary" aria-hidden />
      </div>
      <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight">
        Administration console
      </h1>
      <p className="text-muted-foreground mt-2 text-sm max-w-sm mx-auto">
        Restricted access. Sign in with an authorized administrator account to manage grievances and users.
      </p>
    </div>
  );
}
