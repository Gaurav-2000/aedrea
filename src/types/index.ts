// Shared TypeScript types for Aedrea AI Receptionist SaaS

export interface Business {
  id: string;
  name: string;
  logoUrl?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  timezone: string;
  currency: string;
  gstNumber?: string;
  workingHours: Record<string, any>;
  holidays: any[];
  createdAt: string;
  updatedAt: string;
}

export type UserRole = "super_admin" | "business_owner" | "manager" | "receptionist" | "employee";

export interface User {
  id: string;
  businessId?: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  status: "active" | "inactive";
  roles: UserRole[];
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  businessId: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  tags: string[];
  notes?: string;
  status: "lead" | "active" | "inactive";
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  businessId: string;
  name: string;
  category?: string;
  price: number;
  durationMinutes: number;
  taxRate: number;
  description?: string;
  imageUrls: string[];
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  businessId: string;
  customerId: string;
  employeeId?: string;
  serviceId?: string;
  startTime: string;
  endTime: string;
  status: "scheduled" | "completed" | "cancelled" | "no-show" | "waitlist";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
