import { Plus, UserCheck } from "lucide-react";

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-muted-foreground">Manage doctors & clinic staff</h3>
        <button className="bg-primary hover:bg-blue-700 text-primary-foreground font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer">
          <Plus className="w-4 h-4" /> Add Employee
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground mb-4">
          <UserCheck className="w-5 h-5 text-primary" />
        </div>
        <h4 className="text-sm font-semibold mb-1">Employees Directory</h4>
        <p className="text-xs text-muted-foreground text-center max-w-sm">
          Module 7 — Employees will register staff members, set shifts, manage leaves, and display commissions here.
        </p>
      </div>
    </div>
  );
}
