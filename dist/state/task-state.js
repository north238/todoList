import { Task, TaskStatus } from "../models/task";
import { Modal } from "../models/modal";
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
export class TaskState extends State {
    constructor() {
        super();
        this.tasks = [];
        this.modal = new Modal();
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new TaskState();
        return this.instance;
    }
    addTask(task, description, date) {
        const newTask = new Task(Math.random().toString(), task, description, date, TaskStatus.Active);
        this.tasks.push(newTask);
        this.updateListeners();
        this.saveTasksToLocalStorage();
    }
    removeTask(taskId) {
        const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            this.updateListeners();
            this.saveTasksToLocalStorage();
            this.modal.close();
        }
    }
    moveTask(taskId, newStatus) {
        const task = this.tasks.find((task) => task.id === taskId);
        if (task && task.status !== newStatus) {
            task.status = newStatus;
            this.updateListeners();
            this.saveTasksToLocalStorage();
        }
    }
    initializeTasks() {
        this.tasks = this.fetchTasksFromLocalStorage();
        this.updateListeners();
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.tasks.slice());
        }
    }
    saveTasksToLocalStorage() {
        let jsonData = JSON.stringify(this.tasks);
        localStorage.setItem('data', jsonData);
    }
    fetchTasksFromLocalStorage() {
        const savedTasks = localStorage.getItem('data');
        if (savedTasks) {
            return JSON.parse(savedTasks);
        }
        return [];
    }
}
export const taskState = TaskState.getInstance();
//# sourceMappingURL=task-state.js.map