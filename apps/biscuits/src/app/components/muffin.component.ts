import { Component, Input } from '@angular/core';
import { Muffin, V4GUID } from '../models/muffin';
import { MuffinStore } from '../store/muffin.store';

@Component({
  selector: 'app-muffin',
  template: `{{muffin | json}}`,
  styles: [``]
})
export class MuffinComponent {
  @Input()
  public muffin!: Muffin;
}
