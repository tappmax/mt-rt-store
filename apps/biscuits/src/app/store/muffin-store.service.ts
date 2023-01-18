import { BehaviorSubject, shareReplay } from 'rxjs';
import { Muffin } from '../models/muffin';

/**
 *
 * THIS IS LIKE A NORMAL STATE ENGINE
 * THIS IS NOT INJECTABLE
 *
 */
export class MuffinStoreService {
  private muffinsSource = new BehaviorSubject<Muffin[]>([]);
  public muffins$ = this.muffinsSource.pipe(shareReplay(1));

  public setMuffins(muffins: Muffin[]): void {
    this.muffinsSource.next(muffins);
  }
}
