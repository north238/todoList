var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base-component";
import { taskState } from "../state/task-state";
import { Modal } from "../models/modal";
import { autobind } from "../decorators/autobind";
export class TaskItem extends Component {
    constructor(hostId, task) {
        super('single-task', hostId, false, task.id);
        this.task = task;
        this.modal = new Modal();
        this.templateElement = document.getElementById('modal-template');
        this.configure();
        this.renderContent();
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.task.id);
        event.dataTransfer.effectAllowed = 'move';
    }
    dragEndHandler(_) {
        console.log('Drag end');
    }
    clickHandler() {
        const modalContent = this.templateElement.content.cloneNode(true);
        const modalTaskElement = modalContent.querySelector('h2');
        const modalDescriptionElement = modalContent.querySelector('h3');
        const modalDateElement = modalContent.querySelector('p');
        const deleteButton = modalContent.querySelector('#delete-btn');
        deleteButton.addEventListener('click', this.deleteHandler);
        modalTaskElement.textContent = this.task.task;
        modalDescriptionElement.textContent = `<詳細> ${this.task.description}`;
        modalDateElement.textContent = `<完了日> ${this.task.date}`;
        const modal = document.querySelector('#modal');
        modal.innerHTML = '';
        modal.appendChild(modalContent);
        this.modal.open();
    }
    configure() {
        const modalButton = this.element.querySelector('#modal-btn');
        modalButton.addEventListener('click', this.clickHandler);
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector('h2').textContent = this.task.task;
    }
    deleteHandler() {
        taskState.removeTask(this.task.id);
        this.element.remove();
    }
}
__decorate([
    autobind
], TaskItem.prototype, "dragStartHandler", null);
__decorate([
    autobind
], TaskItem.prototype, "clickHandler", null);
__decorate([
    autobind
], TaskItem.prototype, "deleteHandler", null);
//# sourceMappingURL=task-item.js.map