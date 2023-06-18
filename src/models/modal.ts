import { Task } from "../models/task";

export class Modal {
  private modalElement: HTMLDivElement;
  private taskElement: HTMLHeadingElement;
  private descriptionElement: HTMLHeadingElement;
  private dateElement: HTMLParagraphElement;
  private closeButton: HTMLButtonElement | null;

  constructor() {
    this.modalElement = document.querySelector('#modal')! as HTMLDivElement;
    this.taskElement = this.modalElement.querySelector('h2')! as HTMLHeadingElement;
    this.descriptionElement = this.modalElement.querySelector('h3')! as HTMLHeadingElement;
    this.dateElement = this.modalElement.querySelector('p')! as HTMLParagraphElement;
    this.closeButton = null;
  }

  configure() {
    this.closeButton = this.modalElement.querySelector('.btn-close');
    if(this.closeButton) {
      this.closeButton.addEventListener('click', this.close.bind(this));
    }
  }

  open(): void {
    this.modalElement.style.display = 'block';
    this.configure();
  }

  close(): void {
    this.modalElement.style.display = 'none';
  }

  showTask(task: Task) {
    this.taskElement.textContent = task.task;
    this.descriptionElement.textContent = task.description;
    this.dateElement.textContent = task.date;
  }
}