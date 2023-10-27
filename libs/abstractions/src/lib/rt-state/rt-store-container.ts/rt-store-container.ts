import { RtInjectableStore } from '../rt-injectable-store/rt-injectable-store';
import { AfterViewInit, Directive } from '@angular/core';
import { RtCustomEventBus } from '../rt-event-bus/rt-custom-event-bus';
import { RtStoreSourceEngine } from '../rt-store-source-engine/rt-store-source-engine';
import { RtComponent } from '../../abstracts/rt.component';
import { RtCommonEventBus } from '../rt-event-bus/rt-common-event-bus';

/**
 * RtStoreContainer is an abstraction that allows for a single owner of store
 * state and event bus listening.
 * If you need to use the ngAfterViewInit lifecycle hook, please put all the
 * ngAfterViewInit stuff in {@link rtAfterViewInit} instead, the base class uses
 * ngAfterViewInit, overriding it will break the functionality of the component.
 * @example
 * // ...
 * export class ResultsContainerComponent extends RtStoreContainer implements OnInit {
 *   // ...
 *   protected readonly engine = new StateEngine(this._resultsStateStore, this);
 *
 *   constructor(
 *     private readonly _resultsStateStore: ResultsStateStore,
 *     private readonly _searchRequestEventBus: SearchRequestEventBus
 *   ) {
 *     super('ResultsContainerComponent');
 *   }
 *   // ...
 *   public ngOnInit(): void {
 *     this.addSubscription(this._searchRequestEventBus.listen(this).subscribe(newSearch => {
 *       // yatta...
 *     }));
 *   }
 *   // ...
 * }
 */
@Directive()
export abstract class RtStoreContainer
  extends RtComponent
  implements AfterViewInit
{
  /**
   * Constructs an {@link RtStoreContainer} instance
   * @param name The name of the derived component, this is used for logging
   * @param _logInfo Whether to log diagnostic info. Setting to true will help
   * debug any issues with stores, engines, or event buses that may be
   * misconfigured or incorrectly bound.
   */
  protected constructor(name: string, private _logInfo: boolean = false) {
    super(name);
  }

  /**
   * Hey if you're using ngAfterViewInit, don't do that! You just broke this
   * base class functionality. Please put all the ngAfterViewInit stuff in
   * {@link rtAfterViewInit} instead.
   * @inheritDoc
   */
  public ngAfterViewInit(): void {
    if (this._logInfo) {
      let engineCount: number = 0;
      let storeCount: number = 0;
      let commonEventBusCount: number = 0;
      let customEventBusCount: number = 0;
      // check that everything is wired up correctly
      Object.entries(this).forEach(([key, value]) => {
        if (value instanceof RtStoreSourceEngine) {
          if (value['_constructedCorrectly'] !== true) {
            throw new Error(
              `${key} was not constructed correctly. Please provide the container component during construction.`
            );
          }
          this.log.debug(key, ':: engine bound correctly');
          engineCount++;
        }
        if (value instanceof RtInjectableStore) {
          if (value['_initializedByAnRtStoreSourceEngine'] !== true) {
            throw new Error(
              `${key} was not initialized correctly. Please only initialize stores with an instance of an RtStoreSourceEngine.`
            );
          }
          this.log.debug(key, ':: store bound correctly');
          storeCount++;
        }
        if (value instanceof RtCommonEventBus) {
          if (value['_listenedByAnRtStoreContainer'] !== true) {
            throw new Error(
              `${key} is being listened to by something that shouldn't. Please only listen to event buses with an instance of an RtStoreContainer.`
            );
          }
          this.log.debug(key, ':: common bus bound correctly');
          commonEventBusCount++;
        }
        if (value instanceof RtCustomEventBus) {
          if (value['_listenedByAnRtStoreContainer'] !== true) {
            throw new Error(
              `${key} is being listened to by something that shouldn't. Please only listen to event buses with an instance of an RtStoreContainer.`
            );
          }
          this.log.debug(key, ':: custom bus bound correctly');
          customEventBusCount++;
        }
      });
      this.log.debug('RtState', { engineCount, storeCount, commonEventBusCount, customEventBusCount });
    }
    this.rtAfterViewInit();
  }

  /** @see AfterViewInit */
  public rtAfterViewInit(): void {}
}
