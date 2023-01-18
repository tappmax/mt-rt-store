import { Component } from '@angular/core';
import { MuffinStore } from '../store/muffin.store';

@Component({
  selector: 'app-muffins',
  template: `
    <ng-container
      *ngFor="
        let muffin;
        in: (muffinStore.muffins$ | async) || []
      "
    >
      <app-muffin [muffin]="muffin"></app-muffin>
    </ng-container>
  `,
  styles: [``],
})
export class MuffinsComponent {
  constructor(public muffinStore: MuffinStore) {}
}
