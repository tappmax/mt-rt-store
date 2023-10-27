import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { RtStoreContainer } from '../rt-store-container.ts/rt-store-container';
import { tap } from 'rxjs/operators';

/**
 * A genericized type to use for common event bus scenarios. This mimics the
 * redux pattern with a descriptive action and an optional generic payload
 * property to accompany the event.
 * {@link RtCommonEvent.action}
 * {@link RtCommonEvent.payload}
 */
export interface RtCommonEvent<ActionType, PayloadType> {
  /**
   * The action describing the event taking place. This is intended to be used
   * like a redux pattern, where the action type is a union of string literals
   * describing the event.
   * @example
   * type SavedSearchButtonClickAction = 'create' | 'update' | 'load' | 'delete';
   * // example usage
   * this._savedSearchEventBus.dispatch({
   *   action: 'create',
   *   payload: // bla
   * })
   */
  readonly action: ActionType;
  /**
   * The payload that should accompany an action. This is generic so that you
   * can provide different types of payloads depending on the action.
   * @example
   * interface SavedSearchDeletePayload {
   *   readonly savedSearchId: number;
   * }
   * // example usage
   * this._savedSearchEventBus.dispatch({
   *   action: 'delete',
   *   payload: {
   *     savedSearchId: savedSearchIdToDelete
   *   }
   * })
   */
  readonly payload?: PayloadType;
}

/**
 * RtCommonEventBus is an abstraction that allows us to dispatch messages from child
 * components that may be rendered via a router-outlet to a parent that listens
 * and reacts to dispatched events.
 *
 * In order to implement an event bus, simply extend this class, add Angular's
 * Injectable decorator and supply the type arguments for a {@link RtCommonEvent}
 * that is to be dispatched.
 *
 * Each derived RtCommonEventBus must be in its own file and provisioned at the
 * module or standalone component level using the appropriate providers array.
 * If your app is small and you are ok with the singleton existing in all
 * of your app's routes, you can set the Injectable decorator's
 * `providedInRoot` to `true` instead of provisioning in a specific module
 *
 * @see {@link https://angular.io/guide/dependency-injection#providing-dependency}
 *
 * @example
 * // event bus declaration
 * ＠Injectable()
 * export class SearchRequestEventBus extends RtCommonEventBus<'search' | 'reset', {dateToSearch: Date}> {}
 * // ...
 *
 * // module provisioning
 * ＠NgModule({
 *   declarations: [
 *     // yatta...
 *   ],
 *   imports: [
 *     // yatta...
 *   ],
 *   providers: [
 *     SearchRequestEventBus,
 *   ],
 * })
 * export class ExampleModule {}
 * // ...
 *
 * // dispatching
 * // ... some component
 * constructor(protected readonly searchRequestEventBus: SearchRequestEventBus) {
 *   searchRequestEventBus.dispatch({action: 'search', payload: {dateToSearch: new Date()}});
 * }
 *
 * // listening
 * // ... parent-most container component
 * export class SearchContainerComponent extends RtStoreContainer implements OnInit {
 *   // ...
 *   constructor(private _searchRequestEventBus: SearchRequestEventBus) {
 *     super('SearchContainerComponent');
 *   }
 *
 *   // @inheritDoc
 *   public ngOnInit(): void {
 *     this.addSubscription(this._searchRequestEventBus.listen(this).subscribe(({action, payload}}) => {
 *        switch (action) {
 *       // yatta...
 *     }));
 *   }
 * }
 *
 */
export abstract class RtCommonEventBus<A, P, T extends RtCommonEvent<A, P> = RtCommonEvent<A extends string ? A : never, P>> {
  // For head scratching at the type params...
  // The user is to supply `A` and `P` and that's it.
  // `T` is defaulted to an `RtCommonEvent<A, P>`.
  // `A` must be string-like (a union of strings is string-like, an object is not)
  //    If `A` is not string-like, then an error will be thrown as they try and use
  //    the action property from the event, as `never` is not allowed to be used by
  //    TS, it's a way to guarantee generic type behavior without needing base
  //    types or interfaces.
  // `P` can be whatever the user wants

  private readonly _dispatcher = new EventEmitter<T>();
  private _listenedByAnRtStoreContainer: boolean = false;

  /**
   * Dispatches an event containing a given value
   * @param event - the value to emit to the Event Bus listener
   */
  public dispatch(event: T): void {
    this._dispatcher.emit(event);
  }

  /**
   * An observable function to listen for events being dispatched.
   * @param listener - the execution context of the listener
   * @param logInfo - If `true`, we will log all dispatched events
   * If `false`, we will not log dispatched events.
   * Logging events will never go to production even if the value is true.
   * Default is false.
   * This can be helpful in debugging scenarios.
   * @throws - Will throw an error if there is more than one observer
   * @throws - Will throw an error if listened to by anything other
   * than an RtStoreContainer
   */
  public listen(listener: RtStoreContainer, logInfo: boolean = false): Observable<T> {
    if (listener instanceof RtStoreContainer) {
      this._listenedByAnRtStoreContainer = true;
    } else {
      throw new Error('Event buses must be listened to by RtStoreContainers');
    }
    if (this._dispatcher.observers?.length > 1) {
      throw new Error('Max observer limit of one reached.');
    }
    return this._dispatcher.asObservable().pipe(
      tap((event) => {
        if (logInfo) {
          listener['log'].info('::RtCommonEvent dispatched::', event);
        }
      })
    );
  }
}
