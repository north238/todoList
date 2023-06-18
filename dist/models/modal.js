export class Modal {
    constructor() {
        this.modalElement = document.querySelector('#modal');
        this.taskElement = this.modalElement.querySelector('h2');
        this.descriptionElement = this.modalElement.querySelector('h3');
        this.dateElement = this.modalElement.querySelector('p');
        this.closeButton = null;
    }
    configure() {
        this.closeButton = this.modalElement.querySelector('.btn-close');
        if (this.closeButton) {
            this.closeButton.addEventListener('click', this.close.bind(this));
        }
    }
    open() {
        this.modalElement.style.display = 'block';
        this.configure();
    }
    close() {
        this.modalElement.style.display = 'none';
    }
    showTask(task) {
        this.taskElement.textContent = task.task;
        this.descriptionElement.textContent = task.description;
        this.dateElement.textContent = task.date;
    }
}
//# sourceMappingURL=modal.js.map