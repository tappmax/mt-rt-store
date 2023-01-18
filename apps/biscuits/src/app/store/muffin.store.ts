import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { Muffin } from '../models/muffin';
import { MuffinStoreService } from './muffin.service';

interface IMuffinStore {
  muffins: ReadonlyArray<Muffin>
}

@Injectable({
  providedIn: 'root'
})
export class MuffinStore {
  public muffins$ = this.muffinService.muffins$.pipe(shareReplay(1));
  constructor(private muffinService: MuffinStoreService) {}
}
