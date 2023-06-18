import { Component } from "./base-component";
import { taskState } from "../state/task-state";
import { autobind } from "../decorators/autobind";

export class TaskInput extends Component<HTMLDivElement, HTMLFormElement> {
  taskInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  dateInputElement: HTMLInputElement;

  constructor() {
    super('input-group', 'app', false);
    this.taskInputElement = this.element.querySelector(
      '#task'
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    )! as HTMLInputElement;
    this.dateInputElement = this.element.querySelector(
      '#date'
    )! as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent() {}

  private clearInputs() {
    this.taskInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.dateInputElement.value = '';
  }

  private gatherUserInput(): [string, string, string] | void {
    const enteredTask = this.taskInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredDate = this.dateInputElement.value;
    if (
      enteredTask.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredDate.trim().length === 0
    ) {
      alert('入力値が正しくありません。');
      return;
    } else {
      return [enteredTask, enteredDescription, enteredDate];
    }
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [task, desc, date] = userInput;
      taskState.addTask(task, desc, date);
      this.clearInputs();
    }
  }
}
