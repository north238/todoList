import { Component } from './base-component';
import { taskState } from '../state/task-state';
import { Task } from '../models/task';
import { Modal } from '../models/modal';
import { autobind } from '../decorators/autobind';
import { DraggableElement, TouchEventHandlers } from '../models/touch-event';

export class TaskItem extends Component<HTMLUListElement, HTMLLIElement> {
  templateElement: HTMLTemplateElement;
  private task: Task;
  private modal: Modal;
  private draggable: TouchEventHandlers;

  constructor(hostId: string, task: Task) {
    super('single-task', hostId, false, task.id);
    this.task = task;
    this.modal = new Modal();
    this.draggable = new DraggableElement(this.element);
    this.templateElement = document.getElementById(
      'modal-template'
    ) as HTMLTemplateElement;

    this.configure();
    this.renderContent();
  }

  configure() {
    const modalButton = this.element.querySelector('#modal-btn')!;
    modalButton.addEventListener('click', this.clickHandler, { passive: true });
    modalButton.addEventListener('touchstart', this.clickHandler, {
      passive: true,
    });
    this.element.addEventListener('dragstart', this.dragStartHandler, {
      passive: false,
    });
    this.element.addEventListener('dragend', this.dragEndHandler, {
      passive: false,
    });

    this.element.addEventListener(
      'touchstart',
      (event) => {
        this.draggable.handleTouchStart(event);
      },
      { passive: false }
    );
    this.element.addEventListener(
      'touchmove',
      (event) => {
        this.draggable.handleTouchMove(event);
      },
      { passive: false }
    );
    this.element.addEventListener(
      'touchend',
      (event) => {
        this.draggable.handleTouchEnd(event);
      },
      { passive: false }
    );
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.task.task;
  }

  @autobind
  clickHandler() {
    const modalContent = this.templateElement.content.cloneNode(
      true
    ) as DocumentFragment;
    const modalTaskElement = modalContent.querySelector(
      'h2'
    ) as HTMLHeadingElement;
    const modalDescriptionElement = modalContent.querySelector(
      'h3'
    ) as HTMLHeadingElement;
    const modalDateElement = modalContent.querySelector(
      'p'
    ) as HTMLParagraphElement;
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

  @autobind
  private deleteHandler() {
    taskState.removeTask(this.task.id);
    this.element.remove();
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', this.task.id);
      event.dataTransfer.effectAllowed = 'move';
    }
  }
  dragEndHandler(_: DragEvent) {
    console.log('Drag end');
  }
}