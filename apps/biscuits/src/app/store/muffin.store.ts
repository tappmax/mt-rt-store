import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { Muffin } from '../models/muffin';
import { MuffinStoreService } from './muffin-store.service';

interface IMuffinStore {
  muffins: ReadonlyArray<Muffin>
}

/**
 *
 * THIS IS LIKE A NORMAL STATE ENGINE READONLY ACCESSOR
 * THINGS CAN INJECT THIS
 *
 */
@Injectable({
  providedIn: 'root'
})
export class MuffinStore {
  public muffins$ = this.muffinService.muffins$.pipe(shareReplay(1));
  constructor(private muffinService: MuffinStoreService) {}
}
