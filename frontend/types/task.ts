export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: 'pending' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface TasksResponse {
  data: Task[];
  total: number;
  page: number;
  limit: number;
}