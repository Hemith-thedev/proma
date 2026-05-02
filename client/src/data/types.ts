export type UserRole = "admin" | "teammate" | "user";
export type AccountStatus = "Pending" | "Approved" | "Rejected";
export type ProjectStatus = "Planning" | "In Progress" | "On Hold" | "Completed";
export type Gender = "" | "Male" | "Female" | "Other";

export interface User {
  id?: Number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: 'Male' | 'Female' | 'Other' | string;
  role: "admin" | "teammate" | "user";
  accountStatus: 'Pending' | 'Approved' | 'Rejected';
  createdAt?: Date;
}

export interface Team {
  readonly id: number;
  name: string;
  teamLeader: User | number; // Sir or Senior
  teammateIds: number[];
  projectIds?: number[];
  readonly createdAt: Date;
}

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

export interface Log {
  readonly id: number;
  name: string;
  doneBy: User | number;
  teamId: number;
  description: string | string[];
  readonly createdAt: Date;
}