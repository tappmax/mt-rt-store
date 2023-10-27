import { Directive, inject, OnInit } from '@angular/core';
import { RtComponent } from '../../abstracts/rt.component';
import { getPluckFromComponentProperties } from './rt-pluck-from-store';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

/**
 * An abstraction on RtComponent that allows for use of the decorator,
 * {@link PluckFromStore}.
 *
 * When using this abstract, be sure to use `rtOnInit` instead of
 * implementing ngOnInit.
 * {@link ngOnInit}
 * {@link PluckFromStore}
 */
@Directive()
export abstract class RtComponentThatCanPluckFromStores
  extends RtComponent
  implements OnInit {
  // in the constructor, we grab the properties that were bound
  // to this object's metadata from the decorator parsing phase.
  // We do this in the constructor while we still have the injector
  // context, that way we can inject stores so the user doesn't have
  // to use ctor DI for no reason. Injecting the same store multiple
  // times isn't a concern as the stores should be a singleton, we
  // just end up making a couple extra references in that case that
  // nothing can access
  private __pluckFromComponentProperties = [];

  protected constructor(private readonly _name: string) {
    super(_name);
    // grab all the decorated properties and inject stores
    const unwrappedComponentStoreProps = getPluckFromComponentProperties(this);
    if (!unwrappedComponentStoreProps?.length) {
      this.log.debug('No decorated pluck properties to initialize. Do you mean to be extending RtComponentThatCanPluckFromStores?');
    }
    // we have to inject stores in the constructor context,
    // the injection context will be gone by init time.
    unwrappedComponentStoreProps?.forEach((properties) => {
      const store = inject(properties.storeType);
      this.__pluckFromComponentProperties.push({ store, ...properties });
    });
  }

  /**
   * Hey if you're using ngOnInit, don't do that! You just broke this base class
   * functionality. Please put all the ngOnInit stuff in {@link rtOnInit} instead.
   * @inheritDoc
   */
  public ngOnInit(): void {
    // an RtComponentThatCanPluckFromStores can have multiple properties decorated with
    // the @PluckFromStore decorator. Loop through all decorated properties and add
    // appropriate subscriptions.
    this.__pluckFromComponentProperties.forEach(
      ({ propertyKey, storeType, traversalKey, logInfo, store }) => {
        const storeName = storeType.name;
        if (store === null) {
          this.log.debug(`Initialization failed for ${storeName}. Be sure that ${storeName} is provided in this module or standalone component's providers array.`);
          return;
        }
        if (logInfo) {
          this.log.debug(`Initializing pluck pipeline for ${ storeName }.${ traversalKey ? traversalKey : '' }`);
        }

        // If there is a traversal key, add a subscription that plucks the key from the state$ obs,
        // otherwise, just subscribe to the entire state obs.
        this.addSubscription(
          store.state$.pipe(
            map(state => {
              if (traversalKey) {
                return (state || {})[traversalKey];
              }
              return state;
            }),
            tap(
              (state) => {
                if (logInfo) {
                  this.log.debug(
                    `${ this._name }: syncing ${ propertyKey } with latest from ${
                      storeType.name
                    } store property ${ storeName }.state$.${ traversalKey ? traversalKey : '' }`,
                    state
                  );
                }
                this[propertyKey as string] = state;
              }),
            catchError(error => {
              this.log.debug(`Pipeline for property ${ propertyKey } has failed. Investigate and fix immediately.`, error);
              return of(null);
            })
          ).subscribe());
      });
    this.rtOnInit();
    // cleanup
    delete this.__pluckFromComponentProperties;
  }

  /** called by {@link OnInit} */
  public abstract rtOnInit(): void;
}
