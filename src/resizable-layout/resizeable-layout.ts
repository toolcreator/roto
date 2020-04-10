import { remote, TouchBarScrubber } from 'electron';

export class ResizableLayout {
  private constructor() {
    const handler = document.querySelector('.handler') as HTMLElement;
    const wrapper = handler.closest('main');
    const runningOrderOutput = wrapper.querySelector('.ro-output') as HTMLElement;
    const bandList = wrapper.querySelector('.band-list') as HTMLElement;

    class WidthElem {
      private readonly _elem: HTMLElement;

      private _width: number;
      get width(): number {
        return this._width;
      }
      set width(width: number) {
        this._width = width;
        this._elem.style.width = this.width + '%';
      }

      public bounds: {
        min: number;
        max: number;
      };

      constructor(elem: HTMLElement, width: number, bounds: { min: number; max: number } = { min: 5, max: 95 }) {
        this._elem = elem;
        this.width = width;
        this.bounds = bounds;
      }

      public addWidth(width: number): void {
        let newWidth = this.width + width;
        if (newWidth < this.bounds.min) {
          newWidth = this.bounds.min;
        }
        if (newWidth > this.bounds.max) {
          newWidth = this.bounds.max;
        }
        this.width = newWidth;
      }
      public subWidth(width: number): void {
        this.addWidth(-width);
      }
    }

    const ro = new WidthElem(runningOrderOutput, 80);
    const bl = new WidthElem(bandList, 20);

    let isHandlerDragging = false;
    let lastMouseX: number;

    document.addEventListener('mousedown', e => {
      if (e.target === handler) {
        isHandlerDragging = true;
        lastMouseX = e.clientX;
      }
    });

    document.addEventListener('mousemove', e => {
      if (!isHandlerDragging) {
        return false;
      }
      const windowWidth = remote.getCurrentWindow().getSize()[0];
      const pxDiff = e.clientX - lastMouseX;
      lastMouseX = e.clientX;
      const percDiff = 100 * pxDiff / windowWidth;
      bl.addWidth(percDiff);
      ro.subWidth(percDiff);
    });

    document.addEventListener('mouseup', () => {
      isHandlerDragging = false;
    });
  }

  private static instance: ResizableLayout;

  public static init(): void {
    if (!ResizableLayout.instance) {
      ResizableLayout.instance = new ResizableLayout();
    }
  }
}
