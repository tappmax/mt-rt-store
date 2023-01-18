import { Component, OnInit } from '@angular/core';
import { MuffinService } from '../services/muffin.service';
import { MuffinStoreService } from '../store/muffin.service';
import { MuffinStore } from '../store/muffin.store';

@Component({
  selector: 'app-muffins',
  template: `
    <h1>Muffins</h1>
    <ng-container
      *ngFor="
        let muffinId;
        in: (muffinStore.muffins$ | async) || [] | map : 'id'
      "
    >
      <mt-muffin [muffinId]="muffinId"></mt-muffin>
    </ng-container>
  `,
  styles: [``],
})
export class MuffinContainerComponent implements OnInit {
  constructor(
    private muffinStoreService: MuffinStoreService,
    private muffinService: MuffinService,
    public muffinStore: MuffinStore
  ) {}
  ngOnInit(): void {
    this.muffinService
      .getMuffins()
      .subscribe(this.muffinStoreService.setMuffins);
  }
}
