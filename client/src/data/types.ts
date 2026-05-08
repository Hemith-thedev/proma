import { JSX } from "react";

// Type definitions for the project
export type UserRole = "admin" | "teammate" | "user";
export type AccountStatus = "Pending" | "Approved" | "Rejected";
export type ProjectStatus = "Planning" | "In Progress" | "On Hold" | "Completed";
export type Gender = "" | "Male" | "Female" | "Other";

// User interface representing a user in the system
export interface User {
  id?: Number;
  firstName?: string;
  first_name?: string;
  lastName?: string;
  last_name?: string;
  email: string;
  password: string;
  gender?: 'Male' | 'Female' | 'Other' | string;
  role?: "admin" | "teammate" | "user";
  accountStatus?: 'Pending' | 'Approved' | 'Rejected';
  account_status?: 'Pending' | 'Approved' | 'Rejected';
  createdAt?: Date;
  created_at?: Date;
}

// Team interface representing a team in the system
export interface Team {
  readonly id: number;
  name: string;
  teamLeader: User | number; // Sir or Senior
  teammateIds: number[];
  projectIds?: number[];
  readonly createdAt: Date;
}

// Project interface representing a project in the system
export interface Project {
  readonly id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  teamId: number;
  ownerId: number; // Sir/Admin ID
  deadline?: Date;
  readonly createdAt: Date;
}

// Log interface representing a log entry in the system1
export interface Log {
  readonly id: number;
  name: string;
  doneBy: User | number;
  teamId: number;
  description: string | string[];
  readonly createdAt: Date;
}