import { useAppStore } from "@/lib/store";
import { AdminLayout } from "./AdminLayout";
import { StatCard } from "@/components/StatCard";
import { ComplaintCard } from "@/components/ComplaintCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const COLORS = ["hsl(38, 92%, 50%)", "hsl(200, 80%, 45%)", "hsl(142, 60%, 40%)"];

export default function AdminDashboard() {
  const { complaints } = useAppStore();
  const pending = complaints.filter((c) => c.status === "pending").length;
  const inProgress = complaints.filter((c) => c.status === "in-progress").length;
  const resolved = complaints.filter((c) => c.status === "resolved").length;

  const pieData = [
    { name: "Pending", value: pending },
    { name: "In Progress", value: inProgress },
    { name: "Resolved", value: resolved },
  ];

  const categoryData = [
    { name: "Complaint", count: complaints.filter((c) => c.category === "complaint").length },
    { name: "Query", count: complaints.filter((c) => c.category === "query").length },
    { name: "Support", count: complaints.filter((c) => c.category === "support").length },
  ];

  const highPriority = complaints.filter((c) => c.priority === "high" && c.status !== "resolved");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-heading font-bold">Admin dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total Tickets" value={complaints.length} icon={ClipboardList} variant="primary" />
          <StatCard title="Pending" value={pending} icon={Clock} variant="warning" />
          <StatCard title="In Progress" value={inProgress} icon={AlertTriangle} />
          <StatCard title="Resolved" value={resolved} icon={CheckCircle} variant="success" />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <Card className="animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-heading">Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-heading">By Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={categoryData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(213, 62%, 35%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-lg font-heading font-bold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            High Priority (Unresolved)
          </h2>
          <div className="space-y-3">
            {highPriority.length === 0 ? (
              <p className="text-sm text-muted-foreground">No high-priority unresolved tickets.</p>
            ) : (
              highPriority.map((c) => <ComplaintCard key={c.id} complaint={c} />)
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
