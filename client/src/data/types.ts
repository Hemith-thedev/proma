export interface Team {
  id?: number;
  name: string;
  batch_no: string;
  created_at?: string;
  updated_at?: string; 
}

export interface Teammate {
  id?: number;
  name: string;
  register_no: string;
  email: string;
  phone: string;
  gender: "Male" | "Female" | "Others";
  assigned_works: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Log {
  id?: number;
  label: string;
  status: 'Pending' | 'Ongoing' | 'Completed';
  assigner: string;
  created_at?: string;
  updated_at?: string;
}