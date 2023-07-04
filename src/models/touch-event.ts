export interface TouchEventHandlers {
  handleTouchStart(event: TouchEvent): void;
  handleTouchMove(event: TouchEvent): void;
  handleTouchEnd(event: TouchEvent): void;
}

export class DraggableElement implements TouchEventHandlers {
  public element: HTMLElement;
  public isDragging: boolean = false;
  public startPosX: number = 0;
  public startPosY: number = 0;
  public offsetX: number = 0;
  public offsetY: number = 0;
  public rect: DOMRect;
  public windowScrollX: number;
  public windowScrollY: number;

  constructor(element: HTMLElement) {
    this.element = element;
    this.rect = this.element.getBoundingClientRect();
    this.windowScrollX = window.scrollX || window.pageXOffset;
    this.windowScrollY = window.scrollY || window.pageYOffset;
  }

  public handleTouchStart(event: TouchEvent) {
    if (event.touches.length !== 1) return;
    event.stopImmediatePropagation();
    this.element.classList.add('dragging');
    const touch = event.touches[0];
    this.isDragging = true;
    this.startPosX = touch.pageX - this.windowScrollX - this.rect.width;
    this.startPosY = touch.pageY - this.windowScrollY - this.rect.height;
    this.offsetX = touch.pageX - this.rect.width;
    this.offsetY = touch.pageY - this.rect.height;
  }

  public handleTouchMove(event: TouchEvent) {
    if (!this.isDragging || event.touches.length !== 1) return;
    event.preventDefault();
    const touch = event.touches[0];
    const newPosY = touch.pageY - this.offsetY - this.rect.height;
    this.element.style.top = `${newPosY}px`;
  }

  public handleTouchEnd(event: TouchEvent) {
    event.preventDefault();
    this.isDragging = false;
    this.element.classList.remove('dragging');
    console.log('drag end');
  }
}
