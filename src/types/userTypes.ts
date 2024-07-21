export interface User {
  id: string;
  name: string;
  email: string;
  employeeName: string;
  status: string;
  admissionDate: string;
}

export interface UserState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
