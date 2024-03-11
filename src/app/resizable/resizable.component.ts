import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subject, merge, of } from 'rxjs';
import { tap, auditTime, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: '[m22Resizable]',
  template: `
    <ng-content></ng-content>
    <div class="m22-resizable-handle" cdkDrag 
      (cdkDragStarted)="dragStarted()" 
      (cdkDragEnded)="dragEnded($event)" 
      (cdkDragMoved)="dragMoved($event)"></div>
    <div class="m22-resizable-triangle" *ngIf="sub$ | async"></div>
    <div class="example-handle" cdkDragHandle><svg width="24px" fill="currentColor" viewBox="0 0 24 24">
      <path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"></path>
      <path d="M0 0h24v24H0z" fill="none"></path></svg></div>

  `,
  styleUrls: ['./resizable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class M22ResizableComponent {
  @Output() resized = new EventEmitter<DOMRect>();

  private startSize$ = new Subject<DOMRect>();
  private dragMove$ = new Subject<CdkDragMove>();
  private dragMoveAudited$ = this.dragMove$.pipe(
    withLatestFrom(this.startSize$),
    auditTime(16),
    tap(([{ distance }, rect]) => {
      this.el.nativeElement.style.width = `${rect.width + distance.x}px`;
      this.el.nativeElement.style.height = `${rect.height + distance.y}px`;
    })
  );

  sub$ = merge(this.dragMoveAudited$, of(true));

  constructor(private el: ElementRef<HTMLElement>) {}

  dragStarted(): void {
    this.startSize$.next(this.el.nativeElement.getBoundingClientRect());
  }

  dragEnded($event: CdkDragEnd): void {
    $event.source._dragRef.reset();
    this.resized.emit(this.el.nativeElement.getBoundingClientRect());
  }

  dragMoved($event: CdkDragMove): void {
    this.dragMove$.next($event);
  }
}
