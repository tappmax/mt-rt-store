import { RtBehaviorSubject } from '@rt/factotum';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { RtStoreSourceEngine } from '../rt-store-source-engine/rt-store-source-engine';

/**
 *  RtInjectableStore is an abstraction that allows us to react to state changes
 *  in components that may be rendered via a router-outlet and have no other way
 *  to get new state (inputs). We can also use this to centralize state in large,
 *  complex apps, removing the need for several layers of passthru inputs.
 *
 *  In order to implement a store, simply extend this class, add Angular's
 *  Injectable decorator and supply the type that is to be persisted - `T`.
 *
 *  Each derived RtInjectableStore must be in its own file and provisioned at
 *  the module or standalone component level using the appropriate providers
 *  array.
 *  If your app is small and you are ok with the singleton existing in all
 *  of your app's routes, you can set the Injectable decorator's
 *  `providedInRoot` to `true` instead of provisioning in a specific module
 *
 *  @see {@link https://angular.io/guide/dependency-injection#providing-dependency}
 *
 *  @example
 *  // derived component
 *  ＠Injectable()
 *  export class ResultsStateStore extends RtInjectableStore<IResultsState> {}
 *  // ...
 *
 *  // module provisioning
 *  ＠NgModule({
 *   declarations: [
 *     // yatta...
 *   ],
 *   imports: [
 *     // yatta...
 *   ],
 *   providers: [
 *     ResultsStateStore,
 *   ],
 * })
 *  export class ExampleModule {}
 *  // ...
 *
 *  // reacting to state changes
 *  // ... some component
 *  constructor(protected readonly resultsStateStore: ResultsStateStore) {}
 *  // ... some component's template
 *  <pre>{{resultsStateStore.state$ | async | json}}</pre>
 *  <!-- yatta... -->
 *
 *  // initializing
 *  export class StateEngine extends RtStoreSourceEngine {
 *    private readonly _activeDateSource = new RtBehaviorSubject(null);
 *    constructor(resultsStateStore: ResultsStateStore, container: RtStoreContainer) {
 *      super(container);
 *      this.initialize({
 *        store: resultsStateStore,
 *        source: this._resultsStateSource
 *      });
 *    }
 *    // yatta...
 *  }
 *
 *  ... parent-most container component
 *  export class ResultsContainerComponent extends RtStoreContainer {
 *    protected readonly engine = new StateEngine(this._resultsStateStore, this);
 *    constructor(private readonly _resultsStateStore: ResultsStateStore) {
 *      super('ResultsContainerComponent');
 *    }
 *  // ...
 *  }
 */
export abstract class RtInjectableStore<T> {
  private _stateSource: Readonly<RtBehaviorSubject<T>>;
  public readonly state$: Readonly<Observable<T>>;
  private _initializedByAnRtStoreSourceEngine: boolean = false;

  /**
   * Method used to initialize the store. After initialization, the object is
   * frozen. Freezing an object prevents extensions and makes existing properties
   * non-writable and non-configurable. A frozen object can no longer be changed:
   * new properties cannot be added, existing properties cannot be removed,
   * their enumerability, configurability, writability, or value cannot be changed,
   * and the object's prototype cannot be re-assigned
   * @param stateSource The state source that will be persisted represented as
   * an RtBehaviorSubject
   * @param caller
   * @throws Error If there is more than one initialization, meaning
   * as a singleton, there can only be one source of truth for this store
   * @throws Error If initialize is called by anything other than
   * an RtStoreSourceEngine
   * @throws TypeError If anything violates its frozen state. This will
   * appear as something like `TypeError can't write to readonly bla`
   */
  public initialize(
    stateSource: RtBehaviorSubject<T>,
    caller: RtStoreSourceEngine
  ): void {
    if (this._stateSource) {
      throw new Error('State source already bound.');
    }
    if (caller instanceof RtStoreSourceEngine) {
      this._initializedByAnRtStoreSourceEngine = true;
    } else {
      throw new Error('Stores must be initialized by RtStoreSourceEngines');
    }
    this._stateSource = stateSource;
    (this.state$ as Observable<T>) = this._stateSource.value$.pipe(
      shareReplay(1)
    );
    Object.freeze(this);
  }
}
