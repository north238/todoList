import { Component } from './base-component';
import { DragTarget } from '../models/drag-drop';
import { Task, TaskStatus } from '../models/task';
import { autobind } from '../decorators/autobind';
import { taskState } from '../state/task-state';
import { TaskItem } from './task-item';

export class TaskList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedTasks: Task[];

  constructor(private type: 'active' | 'finished') {
    super('task-list', 'app', true, `${type}-tasks`);
    this.assignedTasks = [];

    this.configure();
    this.renderContent();
    this.initializeTasks();
  }

  @autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @autobind
  dropHandler(event: DragEvent) {
    event.preventDefault();
    const taskId = event.dataTransfer!.getData('text/plain');
    taskState.moveTask(
      taskId,
      this.type === 'active' ? TaskStatus.Active : TaskStatus.Finished
    );
  }

  @autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  @autobind
  touchStartHandler(event: TouchEvent) {
    event.preventDefault();
    console.log('touch start');
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.add('droppable');
  }

  @autobind
  touchEndHandler(event: TouchEvent) {
    event.preventDefault();
    console.log('touch end');
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
    const targetElement = event.target as HTMLElement;
    const listElement = targetElement.closest('li') as HTMLElement;
    const taskId = listElement?.id || targetElement.id;
    taskState.moveTask(
      taskId,
      this.type === 'active' ? TaskStatus.Active : TaskStatus.Finished
    );
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler, {
      passive: false,
    });
    this.element.addEventListener('drop', this.dropHandler, { passive: false });
    this.element.addEventListener('dragleave', this.dragLeaveHandler, {
      passive: true,
    });
    this.element.addEventListener('touchstart', this.touchStartHandler, {
      passive: false,
    });
    this.element.addEventListener('touchend', this.touchEndHandler, {
      passive: false,
    });

    taskState.addListener((tasks: Task[]) => {
      console.log('taskState.addListener()');
      const relevantTasks = tasks.filter((task) => {
        if (this.type === 'active') {
          return task.status === TaskStatus.Active;
        }
        return task.status === TaskStatus.Finished;
      });
      this.assignedTasks = relevantTasks;
      this.checkAndUpdateTaskStatus();
    });
  }

  renderContent() {
    const listId = `${this.type}-tasks-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type === 'active' ? '実行中のタスク' : '完了済みタスク';
  }

  public checkAndUpdateTaskStatus() {
    const listEl = document.getElementById(
      `${this.type}-tasks-list`
    )! as HTMLUListElement;
    listEl.innerHTML = '';

    for (const taskItem of this.assignedTasks) {
      const taskId = taskItem.id;
      const index = this.assignedTasks.findIndex((task) => task.id === taskId);
      if (index !== -1) {
        const newStatus =
          this.type === 'active' ? TaskStatus.Active : TaskStatus.Finished;
        if (this.assignedTasks[index].status !== newStatus) {
          this.assignedTasks[index].status = newStatus;
          new TaskItem(listEl.id, this.assignedTasks[index]);
        }
      }
      console.log('checkAndUpdateTaskStatus()');
      new TaskItem(listEl.id, taskItem);
    }
  }

  private initializeTasks() {
    if (this.type === 'active' || this.type === 'finished') {
      taskState.initializeTasks();
      console.log('initializeTasks()');
    }
  }
}
