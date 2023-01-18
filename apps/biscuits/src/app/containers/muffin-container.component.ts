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
 * Outputs are still the only way for presentation components to signal to make state changes?? Is that ok?
 * Outside of just pulling in ngrx, that's all I can think of as a concession.
 */
export class MuffinContainerComponent implements OnInit {
  private muffinStoreService = new MuffinStoreService();
  constructor(
    private muffinService: MuffinService
  ) {}
  ngOnInit(): void {
    this.muffinService
      .getMuffins()
      .subscribe(this.muffinStoreService.setMuffins);
  }
}
