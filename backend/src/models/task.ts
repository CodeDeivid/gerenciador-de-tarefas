export interface Task {
  id: string;
  name: string;
  description: string;
  status: "pending" | "in_progress" | "done";
}
