/** For internal use only - do not add to barrel file */
import { NgZone } from '@angular/core';

export interface IWidgetComponent {
  _ngZone: NgZone;
  [key: string]: any;
}
