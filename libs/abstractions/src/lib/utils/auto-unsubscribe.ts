// noinspection JSUnusedGlobalSymbols

import {Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

/**
 * the RT Hook to the On Destroy NG Lifecycle hook
 */
export interface RtOnDestroy {
  /** method to be called when class is destroyed */
  rtOnDestroy(): void;
}

// an internal shorthand type
type Constructor<T> = new(...args: any[]) => T;

// the unsubscribe class that is used in our mixin
@Directive()
export abstract class AutoUnsubscribeClass implements OnDestroy {

  private _nextKey: number = 0;

  private _autoUnsubscribeSubscriptions: Map<number, Subscription> = new Map<number, Subscription>();

  /** @inheritDoc */
  public ngOnDestroy(): void {
    // clean up all internal subscriptions
    this._cleanupSubscriptions();

    // call child on destroy code
    this.rtOnDestroy();
  }

  /**
   * a method that can be overridden by the child when cleanup code is missing.
   * Auto Unsubscribe leverages the ngOnDestroy method, so this is a substitute
   * for that lifecycle hook.
   */
  protected rtOnDestroy(): void {
  }

  /** Tags a subscription to be deleted when the component is destroyed */
  protected addSubscription(subscription: Subscription): void {
    if (!subscription)
      return;

    const key = this._nextKey++;
    this._autoUnsubscribeSubscriptions.set(key, subscription);
    subscription.add(() => {
      this._autoUnsubscribeSubscriptions.delete(key);
    });
  }

  /** Removes all of the subscriptions that have been registered by a component */
  private _cleanupSubscriptions(): void {
    if (!this._autoUnsubscribeSubscriptions || !this._autoUnsubscribeSubscriptions.size) return;

    const subscriptions: Subscription[] = [...this._autoUnsubscribeSubscriptions.values()];
    subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}

/** The Auto Unsubscribe mixin */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function AutoUnsubscribe<T extends Constructor<AutoUnsubscribeClass>>(unsubClass: T = (AutoUnsubscribeClass as any)): Constructor<AutoUnsubscribeClass> {
  // returns a new class that extends our unsubClass with a constructor that that will throw an error, if the child
  // component tries to use ngOnDestroy instead of rtOnDestroy
  return class extends unsubClass {

    // pass any arguments to super
    constructor(...args: any[]) {
      super(...args);

      // check to see if the current instance of ngOnDestroy is equal to the base class ngOnDestroy. If it is not
      // equal, then that means it has been overridden and we should throw an error.
      if (this.ngOnDestroy !== AutoUnsubscribeClass.prototype.ngOnDestroy) {
        throw new Error('You must use RtOnDestroy when extending AutoUnsubscribe(), ngOnDestroy is reserved for internal use only');
      }
    }
  };
}
