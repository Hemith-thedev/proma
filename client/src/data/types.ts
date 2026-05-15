import { JSX } from "react";

export type UserRole = "admin" | "teammate" | "user";
export type AccountStatus = "Pending" | "Approved" | "Rejected";
export type ProjectStatus = "Planning" | "In Progress" | "On Hold" | "Completed";
export type Gender = "" | "Male" | "Female" | "Other";

export interface User {
  id?: Number;
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
  contact_no?: string;
  gender?: 'Male' | 'Female' | 'Other' | string;
  role?: "admin" | "teammate" | "user";
  account_status?: 'Pending' | 'Approved' | 'Rejected';
  created_at?: Date;
}

export interface Team {
  readonly id: number;
  name: string;
  team_leader: User | number;
  
  teammate_ids: number[];
  project_ids?: number[];
  readonly created_at: Date;
}

export interface Project {
  readonly id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  team_id: number;
  owner_id: number;
  deadline?: Date;
  readonly created_at: Date;
}

// Log interface representing a log entry in the system1
export interface Log {
  readonly id: number;
  name: string;
  done_by: User | number;
  team_id: number;
  description: string | string[];
  readonly created_at: Date;
}

export interface Settings {
  admin: {
    // safety
    contact_no: string;
    recovery_email: string;

    // account
    first_name: string;
    last_name: string;
    gender: string;
    email: string;
    readonly created_at: string;

    // notifications
    notifications: boolean;
    notification_sound: boolean;

    // formats
    date_format: string;
    time_format: string;
  }
}