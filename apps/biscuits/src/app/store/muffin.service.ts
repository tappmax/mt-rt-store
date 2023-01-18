import { BehaviorSubject, shareReplay } from 'rxjs';
import { Muffin } from '../models/muffin';

export class MuffinStoreService {
  private muffinsSource = new BehaviorSubject<Muffin[]>([]);
  public muffins$ = this.muffinsSource.pipe(shareReplay(1));
  
  public setMuffins(muffins: Muffin[]): void {
    this.muffinsSource.next(muffins);
  }
}
