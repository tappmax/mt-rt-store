import { Component } from '@angular/core';
import { Muffin } from '../models/muffin';
import { MuffinStore } from '../store/muffin.store';
import { generateUUID } from '../utils/crypto.util';

@Component({
  selector: 'app-muffins',
  template: `
    <ng-container *ngFor="let muffin; in: (muffinStore.muffins$ | async) || []">
      <app-muffin
        [muffin]="muffin"
        (create)="handleCreate()"
        (update)="handleUpdate(muffin)"
        (delete)="handleDelete(muffin)"
      ></app-muffin>
    </ng-container>
  `,
  styles: [``],
})
export class MuffinsComponent {
  constructor(public muffinStore: MuffinStore) {}

  public handleCreate = () => {
    this.muffinStore.dispatch.createMuffin({
      id: generateUUID(),
      name: `name${this.muffinStore.getMuffinCount()}`,
    } as Muffin);
  };

  public handleUpdate = (muffin: Muffin) => {
    this.muffinStore.dispatch.updateMuffin({
      ...muffin,
      name: `name${this.muffinStore.getMuffinCount()}`,
    } as Muffin);
  };

  public handleDelete = (muffin: Muffin) => {
    this.muffinStore.dispatch.deleteMuffin(muffin);
  };
}
