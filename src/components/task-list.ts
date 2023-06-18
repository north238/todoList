import { Component } from "./base-component";
import { DragTarget } from "../models/drag-drop";
import { Task, TaskStatus } from "../models/task";
import { autobind } from "../decorators/autobind";
import { taskState } from "../state/task-state";
import { TaskItem } from "./task-item";

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

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('drop', this.dropHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);

    taskState.addListener((tasks: Task[]) => {
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
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type === 'active' ? '実行中のタスク' : '完了済みタスク';
  }

  private renderTasks(): void {
    const listEl = document.getElementById(
      `${this.type}-tasks-list`
    )! as HTMLUListElement;
    listEl.innerHTML = '';
    for (const taskItem of this.assignedTasks) {
      new TaskItem(listEl.id, taskItem);
    }
  }

  private initializeTasks() {
    if (this.type === 'active' || this.type === 'finished') {
      taskState.initializeTasks();
    }
  }
}