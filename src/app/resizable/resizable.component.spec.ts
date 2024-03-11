import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M22ResizableComponent } from './resizable.component';

describe('ResizableComponent', () => {
  let component: M22ResizableComponent;
  let fixture: ComponentFixture<M22ResizableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [M22ResizableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(M22ResizableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
