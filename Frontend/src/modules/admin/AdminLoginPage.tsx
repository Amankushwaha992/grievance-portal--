import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppStore } from "@/lib/store";
import { AdminLoginBranding } from "./components/AdminLoginBranding";
import { AdminLoginForm } from "./components/AdminLoginForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const { currentUser } = useAppStore();

  useEffect(() => {
    document.title = "Admin sign-in — Grievance Portal";
    return () => {
      document.title = "Grievance Portal";
    };
  }, []);

  if (currentUser?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-background to-muted/30 p-4">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
          <Link to="/" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Citizen portal
          </Link>
        </Button>
      </div>

      <div className="w-full max-w-md">
        <AdminLoginBranding />
        <AdminLoginForm />
        <p className="text-center text-[11px] text-muted-foreground mt-6">
          Wrong place?{" "}
          <Link to="/" className="text-primary underline-offset-4 hover:underline font-medium">
            Go to citizen login
          </Link>
        </p>
      </div>
    </div>
  );
}
