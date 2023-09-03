export interface TaskData {
  taskDescripiton: string;
  taskEnd: string;
  taskName: string;
  taskPriority: string;
  taskStart: string;
}

export type Task = [string, Task];
