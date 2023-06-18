var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base-component";
import { taskState } from "../state/task-state";
import { autobind } from "../decorators/autobind";
export class TaskInput extends Component {
    constructor() {
        super('input-group', 'app', false);
        this.taskInputElement = this.element.querySelector('#task');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.dateInputElement = this.element.querySelector('#date');
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
    clearInputs() {
        this.taskInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.dateInputElement.value = '';
    }
    gatherUserInput() {
        const enteredTask = this.taskInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredDate = this.dateInputElement.value;
        if (enteredTask.trim().length === 0 ||
            enteredDescription.trim().length === 0 ||
            enteredDate.trim().length === 0) {
            alert('入力値が正しくありません。');
            return;
        }
        else {
            return [enteredTask, enteredDescription, enteredDate];
        }
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [task, desc, date] = userInput;
            taskState.addTask(task, desc, date);
            this.clearInputs();
        }
    }
}
__decorate([
    autobind
], TaskInput.prototype, "submitHandler", null);
//# sourceMappingURL=task-input.js.map