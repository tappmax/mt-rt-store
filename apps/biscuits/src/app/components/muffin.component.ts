import { Component, Input } from '@angular/core';
import { V4GUID } from '../models/muffin';
import { MuffinStore } from '../store/muffin.store';

@Component({
  selector: 'mt-muffin',
  template: `{{((muffinStore.muffins$ | async) || []) | get : 'id' : muffinId | json}}`,
  styles: [``]
})
export class MuffinComponent {
  @Input()
  public muffinId!: V4GUID;
  constructor(public muffinStore: MuffinStore) {}
}
