import {fakeAsync, tick} from '@angular/core/testing';
import {AutoUnsubscribe} from './auto-unsubscribe';
import {of, BehaviorSubject} from 'rxjs';
import {delay} from 'rxjs/operators';

class TestClass extends AutoUnsubscribe() {

  private mySubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /**
   * Creates a subscription that will close on its own in two ticks
   */
  public createSubscriptionThatWillCloseAfter2Ticks(): void {
    this.addSubscription(of(null).pipe(delay(2)).subscribe());
  }

  /**
   * Creates a subscription that will not close on its own
   */
  public createSubscriptionThatWillNeverClose(): void {
    this.addSubscription(this.mySubject.asObservable().subscribe());
  }
}

describe('auto-unsubscribe', () => {

  it('should execute teardown when subscription completes', fakeAsync(() => {
    const myTester = new TestClass();
    myTester.createSubscriptionThatWillNeverClose();
    expect((myTester as any)._autoUnsubscribeSubscriptions.size).toEqual(1);
    myTester.createSubscriptionThatWillCloseAfter2Ticks();
    expect((myTester as any)._autoUnsubscribeSubscriptions.size).toEqual(2);
    tick(1);
    myTester.createSubscriptionThatWillCloseAfter2Ticks();
    expect((myTester as any)._autoUnsubscribeSubscriptions.size).toEqual(3);
    tick(1);
    expect((myTester as any)._autoUnsubscribeSubscriptions.size).toEqual(2);
    tick(1);
    expect((myTester as any)._autoUnsubscribeSubscriptions.size).toEqual(1);
    myTester.ngOnDestroy();
    expect((myTester as any)._autoUnsubscribeSubscriptions.size).toEqual(0);
  }));
});
