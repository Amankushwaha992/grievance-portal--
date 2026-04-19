import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, registerUser, currentUser } = useAppStore();
  const [loginEmail, setLoginEmail] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    if (currentUser.role === "admin") navigate("/admin", { replace: true });
    else navigate("/dashboard", { replace: true });
  }, [currentUser, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(loginEmail, "");
    if (success) {
      const user = useAppStore.getState().currentUser;
      toast.success(`Welcome back, ${user?.name}!`);
      navigate("/dashboard");
    } else {
      toast.error("Invalid citizen credentials. Try rajesh@example.com or use Administrator sign-in below.");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const success = registerUser(regName, regEmail);
    if (success) {
      toast.success("Registration successful!");
      navigate("/dashboard");
    } else {
      toast.error("Email already registered");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Grievance Portal
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Digital Public Service Complaint System
          </p>
        </div>

        <Card className="animate-fade-in">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Welcome</CardTitle>
            <CardDescription>Sign in or create a new account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="rajesh@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Any password (demo)" />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                  <p className="text-[11px] text-muted-foreground text-center">
                    Demo citizen: <strong>rajesh@example.com</strong> — password ignored.
                  </p>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="regEmail">Email</Label>
                    <Input
                      id="regEmail"
                      type="email"
                      placeholder="your@email.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="regPass">Password</Label>
                    <Input id="regPass" type="password" placeholder="Choose a password" />
                  </div>
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-4 border-t text-center">
              <p className="text-xs text-muted-foreground mb-2">Staff or administrator?</p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/admin/login">Administrator sign-in</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
