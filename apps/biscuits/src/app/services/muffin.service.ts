import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Muffin } from '../models/muffin';
import { generateUUID } from '../utils/crypto.util';

@Injectable({
  providedIn: 'root'
})
export class MuffinService {
  private makeMuffin = (_: null, index: number): Muffin => ({
    id: generateUUID(),
    name: `muffin_${index}`
  } as Muffin);

  private makeMuffins = (muffinCount: number): Muffin[] => {
    return new Array(muffinCount).fill(null).map(this.makeMuffin);
  }

  /** */
  public getMuffins(): Observable<Muffin[]> {
    return of(this.makeMuffins(5));
  }
}
