import { Component,ViewChild,ElementRef } from '@angular/core';
import {
  CdkDragDrop,
  CdkDragMove,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  off: any;
  scaleX = 100 / 200; //relation aspect between items.width in dropZone and items.width in List
  scaleY = 1; //relation aspect between items.height in dropZone and items.height in List
  _pointerPosition;
  posInside: { source: any; x: number; y: number } = {
    source: null,
    x: 0,
    y: 0,
  };
  @ViewChild('doneList', { read: ElementRef, static: true })
  dropZone: ElementRef;

  title = 'case-study';
  todo = [
    { type:"img",label: "https://i.nefisyemektarifleri.com/2022/02/01/zeytinyagli-sarma-tarifi.jpg" , x: 0, y: 0, 'z-index': 0 },
    { type:"img",label: "https://i.nefisyemektarifleri.com/2024/02/27/kisir-tarifi-5.jpg", x: 0, y: 0, 'z-index': 0 },
    { type:"card",label: "https://www.travelandleisure.com/thmb/OxTfa-TTiGTLm_jUvSw2egK7eSs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/boston-massachusetts-BOSTONTG0221-719aef2eeb1c4929b6c839715e34a69e.jpg", x: 0, y: 0, 'z-index': 0 },
    { type:"text",label: 'Fall asleep', x: 0, y: 0, 'z-index': 0 },
    { type:"text", label: 'Get up', x: 0, y: 0, 'z-index': 0 },
    { type:"text",label: 'Brush teeth', x: 0, y: 0, 'z-index': 0 },
    { type:"text",label: 'Take a shower', x: 0, y: 0, 'z-index': 0 },
    { type:"text",label: 'Check e-mail', x: 0, y: 0, 'z-index': 0 },
    { type:"text",label: 'Walk dog', x: 0, y: 0, 'z-index': 0 },
  ];
  done = [];
  onDrag: boolean = false;
  drop(event: CdkDragDrop<any[]>, isDropZone: boolean = false) {
    if (event.previousContainer != event.container) {
      const data = event.previousContainer.data[event.previousIndex];
      const index = event.container.data.length;
      event.container.data.push({
        type : data.type,
        label: data.label,
        x:
          this._pointerPosition.x -
          this.off.x * this.scaleX -
          this.dropZone.nativeElement.getBoundingClientRect().left,
        y:
          this._pointerPosition.y -
          this.off.y * this.scaleY -
          this.dropZone.nativeElement.getBoundingClientRect().top,
        'z-index': 0,
      });
      event.item.data.y =
        this._pointerPosition.y -
        this.off.y * this.scaleY -
        this.dropZone.nativeElement.getBoundingClientRect().top;
      event.item.data.x =
        this._pointerPosition.x -
        this.off.x * this.scaleX -
        this.dropZone.nativeElement.getBoundingClientRect().left;
      this.changeZIndex(event.container.data[index]);
    }
    this.posInside = { source: null, x: 0, y: 0 };
  }

  moved(event: CdkDragMove) {
    this._pointerPosition = event.pointerPosition;
  }

  changeZIndex(item: any) {
    this.done.forEach((x) => (x['z-index'] = x == item ? 1 : 0));
  }

  changePosition(event: CdkDragDrop<any>, field) {
    const rectZone = this.dropZone.nativeElement.getBoundingClientRect();
    const rectElement =
      event.item.element.nativeElement.getBoundingClientRect();

    let y = +field.y + event.distance.y;
    let x = +field.x + event.distance.x;
    const out =
      y < 0 ||
      x < 0 ||
      y > rectZone.height - rectElement.height ||
      x > rectZone.width - rectElement.width;

    if (!out) {
      field.y = y;
      field.x = x;
      this.done = this.done.sort((a, b) =>
        a['z-index'] > b['z-index'] ? 1 : a['z-index'] < b['z-index'] ? -1 : 0
      );
    } else {
      this.done = this.done.filter((x) => x != field);
    }
  }
}
