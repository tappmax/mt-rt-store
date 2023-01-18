import { Injectable } from '@angular/core';
import { Observable, shareReplay, Subject } from 'rxjs';
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
  private muffinStoreService!: MuffinStoreService;
  public muffins$!: Observable<ReadonlyArray<Muffin>>;
  public dispatcher = new Subject<IMuffinStoreDispatcher>();

  public initialize(storeService: MuffinStoreService): void {
    if (this.muffinStoreService) throw new Error('store service already bound');
    this.muffinStoreService = storeService;
    this.muffins$ = this.muffinStoreService.muffins$.pipe(shareReplay(1));
  }

  public updateMuffin(muffin: Muffin): void {
    this.dispatcher.next({
      action: 'UPDATE',
      payload: muffin
    })
  }
}
