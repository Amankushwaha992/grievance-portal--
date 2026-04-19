import { useAppStore } from "@/lib/store";
import { AdminLayout } from "./AdminLayout";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User } from "lucide-react";

export default function AdminUsers() {
  const { users, complaints } = useAppStore();

  const rows = users.map((u) => ({
    ...u,
    ticketCount: complaints.filter((c) => c.userId === u.id).length,
  }));

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-heading font-bold">Users</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Registered accounts and ticket counts (demo data).
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-heading">Directory</CardTitle>
            <CardDescription>Citizens and administrators who can sign in.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Tickets</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.name}</TableCell>
                    <TableCell className="text-muted-foreground">{u.email}</TableCell>
                    <TableCell>
                      {u.role === "admin" ? (
                        <Badge variant="default" className="gap-1">
                          <Shield className="h-3 w-3" />
                          Admin
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1">
                          <User className="h-3 w-3" />
                          Citizen
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{u.ticketCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
