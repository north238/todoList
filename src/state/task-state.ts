import { Task, TaskStatus } from "../models/task";
import { Modal } from "../models/modal";

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class TaskState extends State<Task> {
  private tasks: Task[] = [];
  private static instance: TaskState;
  private modal: Modal;

  private constructor() {
    super();
    this.modal = new Modal();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new TaskState();
    return this.instance;
  }

  addTask(task: string, description: string, date: string) {
    const newTask = new Task(
      Math.random().toString(),
      task,
      description,
      date,
      TaskStatus.Active
    );
    this.tasks.push(newTask);
    this.updateListeners();
    this.saveTasksToLocalStorage();
  }

  removeTask(taskId: string) {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
    if(taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      this.updateListeners();
      this.saveTasksToLocalStorage();

      this.modal.close();
    }
  }

  moveTask(taskId: string, newStatus: TaskStatus) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task && task.status !== newStatus) {
      task.status = newStatus;
      this.updateListeners();
      this.saveTasksToLocalStorage();
    }
  }

  public initializeTasks() {
    this.tasks = this.fetchTasksFromLocalStorage();
    this.updateListeners();
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.tasks.slice());
    }
  }

  private saveTasksToLocalStorage() {
    let jsonData = JSON.stringify(this.tasks);
    localStorage.setItem('data', jsonData);
  }

  private fetchTasksFromLocalStorage(): Task[] {
    const savedTasks = localStorage.getItem('data');
    if (savedTasks) {
      return JSON.parse(savedTasks) as Task[];
    }
    return [];
  }
}

export const taskState = TaskState.getInstance();
