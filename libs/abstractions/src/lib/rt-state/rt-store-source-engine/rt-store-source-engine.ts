import { RtInjectableStore } from '../rt-injectable-store/rt-injectable-store';
import { RtBehaviorSubject } from '@rt/factotum';
import { RtStoreContainer } from '../rt-store-container.ts/rt-store-container';

interface IRtStoreSource {
  readonly store: RtInjectableStore<unknown>;
  readonly source: RtBehaviorSubject<unknown>;
}

/**
 * RtStoreSourceEngine is an abstraction that is intended to be the source of
 * store state. When extending RtStoreSourceEngine, there are checks performed
 * to ensure proper architecture and use of stores, store sources, and store
 * containers.
 * @example
 * // ...
 * export class ResultsContainerComponent extends RtStoreContainer {
 *   // ...
 *   protected readonly engine = new StateEngine(this._resultsStateStore, this);
 *   constructor(private readonly _resultsStateStore: ResultsStateStore) {
 *     super('ResultsContainerComponent');
 *   }
 *   // ...
 * }
 */
export abstract class RtStoreSourceEngine {
  private _initialized: boolean = false;
  private _constructedCorrectly: boolean = false;

  protected constructor(container: RtStoreContainer) {
    if (container instanceof RtStoreContainer) {
      this._constructedCorrectly = true;
    } else {
      throw new Error(
        'You must construct an RtStoreSourceEngine with an instance of RtStoreContainer.'
      );
    }
  }

  /**
   * Binds store sources with engine properties. Anytime you next the provided
   * sources, the stores will receive new values.
   */
  protected initialize(
    caller: RtStoreSourceEngine,
    { store, source }: IRtStoreSource
  ): void {
    store.initialize(source, caller);
    this._initialized = true;
  }
}
