import { Injectable } from '@angular/core';
import { shareReplay, Subject } from 'rxjs';
import { Muffin } from '../models/muffin';
import { MuffinStoreService } from './muffin-store.service';

interface IMuffinStoreDispatcher {
  action: 'UPDATE' | 'CREATE' | 'DELETE'
  payload: Muffin
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
  public dispatcher = new Subject<IMuffinStoreDispatcher>();

  constructor(private muffinService: MuffinStoreService) {}

  public updateMuffin(muffin: Muffin): void {
    this.dispatcher.next({
      action: 'UPDATE',
      payload: muffin
    })
  }
}
