var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base-component";
import { TaskStatus } from "../models/task";
import { autobind } from "../decorators/autobind";
import { taskState } from "../state/task-state";
import { TaskItem } from "./task-item";
export class TaskList extends Component {
    constructor(type) {
        super('task-list', 'app', true, `${type}-tasks`);
        this.type = type;
        this.assignedTasks = [];
        this.configure();
        this.renderContent();
        this.initializeTasks();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul');
            listEl.classList.add('droppable');
        }
    }
    dropHandler(event) {
        const taskId = event.dataTransfer.getData('text/plain');
        taskState.moveTask(taskId, this.type === 'active' ? TaskStatus.Active : TaskStatus.Finished);
    }
    dragLeaveHandler(_) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        taskState.addListener((tasks) => {
            const relevantTasks = tasks.filter((task) => {
                if (this.type === 'active') {
                    return task.status === TaskStatus.Active;
                }
                return task.status === TaskStatus.Finished;
            });
            this.assignedTasks = relevantTasks;
            this.renderTasks();
        });
    }
    renderContent() {
        const listId = `${this.type}-tasks-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type === 'active' ? '実行中のタスク' : '完了済みタスク';
    }
    renderTasks() {
        const listEl = document.getElementById(`${this.type}-tasks-list`);
        listEl.innerHTML = '';
        for (const taskItem of this.assignedTasks) {
            new TaskItem(listEl.id, taskItem);
        }
    }
    initializeTasks() {
        if (this.type === 'active' || this.type === 'finished') {
            taskState.initializeTasks();
        }
    }
}
__decorate([
    autobind
], TaskList.prototype, "dragOverHandler", null);
__decorate([
    autobind
], TaskList.prototype, "dropHandler", null);
__decorate([
    autobind
], TaskList.prototype, "dragLeaveHandler", null);
//# sourceMappingURL=task-list.js.map