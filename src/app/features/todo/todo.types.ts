export type TodosResponseConfig<T> = {
  count: number;
  next: boolean | null;
  previous: boolean | null;
  results: T[];
};
export type TodosResponse = TodosResponseConfig<TodoItem>;

export type TodoItem = {
  title: string;
  completed: boolean;
  user: number;
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type TodoDataRequest = {
  title: string;
  completed: boolean;
  user: number;
};
