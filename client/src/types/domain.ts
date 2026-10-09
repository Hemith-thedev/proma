// export interface User extends Timestamps {
//   id: Id;
//   fullName: string;
//   email: string;
//   status: AccountStatus;
//   role: Role;
//   leaderTeamIds: Id[];
//   presence: PresenceStatus;
// }

// export interface AuthSession {
//   user: User;
//   expiresAt: string;
// }

// export interface AccessRequest extends Timestamps {
//   id: Id;
//   applicantId: Id;
//   applicant?: User;
//   status: AccessRequestStatus;
//   message?: string;
//   reviewReason?: string;
//   reviewedById?: Id;
//   reviewedAt?: string;
// }

// export interface Team extends Timestamps {
//   id: Id;
//   name: string;
//   description?: string;
//   status: TeamStatus;
//   memberIds: Id[];
//   leaderIds: Id[];
// }

// export interface Project extends Timestamps {
//   id: Id;
//   name: string;
//   description?: string;
//   status: ProjectStatus;
//   teamIds: Id[];
//   memberIds: Id[];
//   ownerId: Id;
//   startDate?: string;
//   dueDate?: string;
// }

// export interface Task extends Timestamps {
//   id: Id;
//   title: string;
//   description?: string;
//   status: TaskStatus;
//   priority: TodoPriority;
//   projectId: Id;
//   teamId?: Id;
//   assigneeId?: Id;
//   creatorId: Id;
//   dueDate?: string;
//   completedAt?: string;
// }

// export interface TaskHistoryEntry {
//   id: Id;
//   taskId: Id;
//   actorId: Id;
//   field: string;
//   previousValue?: string;
//   nextValue?: string;
//   createdAt: string;
// }

// export interface Todo extends Timestamps {
//   id: Id;
//   ownerId: Id;
//   title: string;
//   completed: boolean;
//   dueDate?: string;
// }

// export interface AttendanceRecord extends Timestamps {
//   id: Id;
//   userId: Id;
//   date: string;
//   status: AttendanceStatus;
//   note?: string;
//   recordedAt: string;
// }

// export interface DailyLog extends Timestamps {
//   id: Id;
//   userId: Id;
//   date: string;
//   summary: string;
//   blockers?: string;
//   accomplishments?: string;
// }

// export interface AuditEvent {
//   id: Id;
//   actorId: Id;
//   action: string;
//   entityType: string;
//   entityId?: Id;
//   metadata?: Record<string, unknown>;
//   createdAt: string;
// }

export type TeamStatus = "active" | "archived";

export type ProjectStatus =
  "planning" | "active" | "on_hold" | "completed" | "archived";

export type TaskStatus =
  "backlog" | "todo" | "in_progress" | "blocked" | "completed";

export type TodoPriority = "low" | "medium" | "high" | "urgent";

export type TodoStatus = "in_progress" | "completed" | "delayed" | "removed";

export type Id = string;

export type AccountStatus =
  "pending" | "active" | "disabled" | "rejected" | "archived";

export type Role = "admin" | "team_leader" | "member";

export type AccessRequestStatus =
  "pending" | "accepted" | "rejected" | "cancelled";

export type PresenceStatus = "available" | "away" | "busy" | "offline";

export type AttendanceStatus =
  "present" | "absent" | "late" | "remote" | "leave";

export type ProjectProductionStatus =
  "in_progress" | "hold" | "rejected" | "completed";

export type ProjectVerificationStatus = "not_verified" | "verified";

export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

export interface UserDetails {
  username: string;
  first_name: string;
  last_name: string;
  age: string;
  role: Role;
  about: string;
  email: string;
  password: string;
  team_leaders_ids: Id[];
}

export interface UserMeta {
  account_status: AccountStatus;
  access_request_status: AccessRequestStatus;
  attendace_status: AttendanceStatus;
  presence_status: PresenceStatus;
}

export interface Preferences {
  enable_animations: boolean;
  enable_age: boolean;
  enable_high_contrast: boolean;
  enable_motion_blur: boolean;
}

export interface User extends Timestamps {
  id: Id;
  details: UserDetails;
  meta: UserMeta;
  preferences: Preferences;
}

export interface Log extends Timestamps {
  id: Id;
  heading: string;
  body: string;
  done_by: Id[];
  checked: boolean;
  seen_by_admin: boolean;
  verified: boolean;
}

export interface TodoMember {
  id: Id;
  status: TodoStatus;
  priority: TodoPriority;
}

export interface Todo extends Timestamps {
  id: Id;
  label: string;
  status: TodoStatus;
  priority: TodoPriority;
  members: TodoMember[];
  completedAt: Date;
}

export interface Project extends Timestamps {
  id: Id;
  meta: {
    name: string;
    description: string;
    members: Id[];
    team_leader: Id;
    production_status: ProjectProductionStatus;
    verification_status: ProjectVerificationStatus;
  };
}