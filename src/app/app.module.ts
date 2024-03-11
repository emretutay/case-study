import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { M22ResizableComponent } from './resizable/resizable.component';
import { DynamicComponent } from './dynamic/dynamic.component';




@NgModule({
  declarations: [
    AppComponent,
    M22ResizableComponent,
    DynamicComponent
    
    
    
  ],
  imports: [
    BrowserModule,
    DragDropModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
