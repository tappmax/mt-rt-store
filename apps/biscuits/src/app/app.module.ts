import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MuffinComponent } from './components/muffin.component';
import { MuffinsComponent } from './components/muffins.component';
import { MuffinContainerComponent } from './containers/muffin-container.component';
import { GetPipe } from './pipes/get.pipe';
import { PluckPipe } from './pipes/pluck.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MuffinContainerComponent,
    MuffinsComponent,
    MuffinComponent,
    GetPipe,
    PluckPipe
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
