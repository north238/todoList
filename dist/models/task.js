export var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["Active"] = 0] = "Active";
    TaskStatus[TaskStatus["Finished"] = 1] = "Finished";
})(TaskStatus || (TaskStatus = {}));
export class Task {
    constructor(id, task, description, date, status) {
        this.id = id;
        this.task = task;
        this.description = description;
        this.date = date;
        this.status = status;
    }
}
//# sourceMappingURL=task.js.map