export enum TaskStatus {
  Active,
  Finished,
}

export class Task {
  constructor(
    public id: string,
    public task: string,
    public description: string,
    public date: string,
    public status: TaskStatus
  ) {}
}
