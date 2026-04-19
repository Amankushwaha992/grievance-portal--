import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export function AdminLoginForm() {
  const navigate = useNavigate();
  const { loginAdmin, currentUser } = useAppStore();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginAdmin(loginEmail, loginPassword);
    if (ok) {
      const user = useAppStore.getState().currentUser;
      toast.success(`Signed in as ${user?.name}`);
      navigate("/admin", { replace: true });
    } else {
      toast.error("Invalid administrator credentials.");
    }
  };

  return (
    <Card className="animate-fade-in border-primary/20 shadow-md shadow-primary/5">
      <CardHeader className="space-y-1 pb-4">
        <div className="flex items-center gap-2 text-primary">
          <Lock className="h-4 w-4" aria-hidden />
          <CardTitle className="text-lg font-heading">Administrator sign-in</CardTitle>
        </div>
        <CardDescription>
          Use your official admin email. Citizen accounts cannot access this console.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentUser?.role === "user" && (
          <Alert variant="default" className="border-amber-500/40 bg-amber-500/10">
            <AlertTitle className="text-xs font-semibold text-amber-950 dark:text-amber-100">
              Citizen session active
            </AlertTitle>
            <AlertDescription className="text-xs text-amber-900/90 dark:text-amber-50/90">
              Signing in here will switch this browser to an administrator account ({currentUser.email}).
            </AlertDescription>
          </Alert>
        )}

        <Alert className="bg-muted/50 border-muted-foreground/20">
          <AlertTitle className="text-xs font-semibold">Demo</AlertTitle>
          <AlertDescription className="text-xs text-muted-foreground">
            Email <strong className="text-foreground">admin@gov.in</strong> — password is ignored in this demo.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email">Work email</Label>
            <Input
              id="admin-email"
              type="email"
              autoComplete="username"
              placeholder="admin@gov.in"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter password (demo: any)"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Sign in to admin console
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
