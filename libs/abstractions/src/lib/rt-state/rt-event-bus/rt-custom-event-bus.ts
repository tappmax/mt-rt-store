import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { RtStoreContainer } from '../rt-store-container.ts/rt-store-container';
import { tap } from 'rxjs/operators';

/**
 * RtCustomEventBus is an abstraction that allows us to dispatch messages from child
 * components that may be rendered via a router-outlet to a parent that listens
 * and reacts to dispatched events.
 *
 * In order to implement an event bus, simply extend this class, add Angular's
 * Injectable decorator and supply the custom type that is to be dispatched `T`.
 *
 * Each derived RtCustomEventBus must be in its own file and provisioned at the
 * module or standalone component level using the appropriate providers array.
 * If your app is small and you are ok with the singleton existing in all
 * of your app's routes, you can set the Injectable decorator's
 * `providedInRoot` to `true` instead of provisioning in a specific module
 *
 * @see {@link https://angular.io/guide/dependency-injection#providing-dependency}
 *
 * @example
 * // derived component
 * ＠Injectable()
 * export class SearchRequestEventBus extends RtCustomEventBus<Date> {}
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
 *   searchRequestEventBus.dispatch(new Date());
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
 *     this.addSubscription(this._searchRequestEventBus.listen(this).subscribe(newSearchRequest => {
 *       // yatta...
 *     }));
 *   }
 * }
 *
 */
export abstract class RtCustomEventBus<T> {
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
          listener['log'].info('::custom event dispatched::', event);
        }
      })
    );
  }
}
