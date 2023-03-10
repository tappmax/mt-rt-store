import { Component, OnInit } from '@angular/core';
import { MuffinService } from '../services/muffin.service';
import { MuffinStoreService } from '../store/muffin-store.service';
import { MuffinStore } from '../store/muffin.store';

@Component({
  selector: 'app-muffin-container',
  template: `
    <h1>Muffins</h1>
    <app-muffins></app-muffins>
  `,
  styles: [``],
})
/**
 *
 * THIS IS THE CONTAINER/SMART COMPONENT.
 * IT WILL HANDLE DUMB COMPONENT OUTPUTS AND:
 * * UPDATE PERSISTED STATE: USES HTTP SERVICE, FROM THERE STATE SHOULD PROPAGATE DOWN INTO THE STORE
 * * UI STATE: USES STORE SERVICE, INJECTABLE STORE WILL UPDATE, BUT THAT'S IT
 *
 */
export class MuffinContainerComponent implements OnInit {
  private muffinStoreService = new MuffinStoreService();
  constructor(
    private muffinService: MuffinService,
    private muffinStore: MuffinStore
  ) {}
  ngOnInit(): void {
    this.muffinService
      .getMuffins()
      .subscribe(this.muffinStoreService.setMuffins);

    this.muffinStore.initialize(this.muffinStoreService);

    this.muffinStore.dispatcher.subscribe(({action, payload}) => {
      if (action === 'UPDATE') {
        const muffinState = this.muffinStoreService.getMuffins();
        const updateIndex = muffinState.findIndex((m) => m.id === payload.id);
        muffinState.splice(updateIndex, 1);
        this.muffinStoreService.setMuffins({
          ...muffinState
        });
      }
      if (action === 'CREATE') {
        const muffinState = this.muffinStoreService.getMuffins();
        muffinState.push(payload);
        this.muffinStoreService.setMuffins({
          ...muffinState
        });
      }
      if (action === 'CREATE') {
        const muffinState = this.muffinStoreService.getMuffins();
        this.muffinStoreService.setMuffins({
          ...muffinState.filter(m => m.id === payload.id)
        });
      }
    })
  }
}
