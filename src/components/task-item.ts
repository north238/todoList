import { Component } from "./base-component";
import { taskState } from "../state/task-state";
import { Draggable } from "../models/drag-drop";
import { Task } from "../models/task";
import { Modal } from "../models/modal";
import { autobind } from "../decorators/autobind";

export class TaskItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private task: Task;
  private modal: Modal;
  templateElement: HTMLTemplateElement;

  constructor(hostId: string, task: Task) {
    super('single-task', hostId, false, task.id);
    this.task = task;
    this.modal = new Modal();
    this.templateElement = document.getElementById('modal-template') as HTMLTemplateElement;


    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.task.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  dragEndHandler(_: DragEvent) {
    console.log('Drag end');
  }

  @autobind
  clickHandler() {
    const modalContent = this.templateElement.content.cloneNode(true) as DocumentFragment;
    const modalTaskElement = modalContent.querySelector('h2') as HTMLHeadingElement;
    const modalDescriptionElement = modalContent.querySelector('h3') as HTMLHeadingElement;
    const modalDateElement = modalContent.querySelector('p') as HTMLParagraphElement;
    const deleteButton = modalContent.querySelector('#delete-btn')!;
    deleteButton.addEventListener('click', this.deleteHandler);

    modalTaskElement.textContent = this.task.task;
    modalDescriptionElement.textContent = `<詳細> ${this.task.description}`;
    modalDateElement.textContent = `<完了日> ${this.task.date}`;

    const modal = document.querySelector('#modal')! as HTMLDivElement;
    modal.innerHTML = '';
    modal.appendChild(modalContent);

    this.modal.open();
  }

  configure() {
    const modalButton = this.element.querySelector('#modal-btn')!;
    modalButton.addEventListener('click', this.clickHandler);
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.task.task;
  }

  @autobind
  private deleteHandler() {
    taskState.removeTask(this.task.id);
    this.element.remove();
  }
}