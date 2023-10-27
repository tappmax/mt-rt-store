import { Type } from '@angular/core';
import 'reflect-metadata';
import { RtInjectableStore } from '../rt-injectable-store/rt-injectable-store';
import { RtComponentThatCanPluckFromStores } from './rt-component-that-can-pluck-from-stores';

const storeMetadataKey = Symbol('__RT_METADATA__PluckFromStore__');

interface IPluckFromStoreOptions<T> {
  /**
   * Often, we'll want a store to be coupled with several pieces of state, e.g.:
   *
   * - The criteria used for the server responses
   * - The server responses
   * - Any ancillary data that is directly related to any of the slices of state
   *
   *
   * Coupling state slices in a single store help to mitigate timing issues due
   * to one piece of state inherently always being updated before another e.g.:
   *
   * - You must update criteria first and send that in a request in order to get
   * the responses.
   */
  readonly traversalKey?: keyof T | undefined;
  /**
   * If `true`, we will log all state updates
   *
   * If `false`, we will not log state updates.
   *
   * Default is false.
   *
   * Logging updates will never go to production, even if left true.
   *
   * This can be helpful in debugging scenarios.
   */
  readonly logInfo?: boolean;
}

export interface IPluckFromStoreMetadata<
  StoreType extends Type<RtInjectableStore<T>>,
  T
> extends IPluckFromStoreOptions<T> {
  /**
   * The type of the store that is injected. During initialization, we use this
   * to find the instance of the injected store so that we can subscribe to its
   * state observable.
   */
  readonly storeType: StoreType;
  /**
   * The key of the decorated property, it will be a property of the
   * derived RtComponentThatCanPluckFromStores.
   */
  readonly propertyKey: string;
}

/**
 * A decorator that is enabled by extending
 * {@link RtComponentThatCanPluckFromStores}.
 *
 * Allows one to use an RtInjectableStore's state value synchronously and pluck
 * any of the store's properties directly instead of subscribing to the entire
 * state of the store just for one of the state object's values. Currently, this
 * only supports one level of nesting, in the future we may support multi-level
 * plucking.
 *
 * To find the instance of the injected store so that we can subscribe to its
 * state observable.
 * Often, we'll want a store to be coupled with several pieces of state, e.g.:
 * The criteria used for the server responses;
 * The server responses;
 * Any ancillary data that is directly related to any of the slices of state.
 * Coupling state slices in a single store help to mitigate timing issues due
 * to one piece of state inherently always being updated before another e.g.:
 * You must update criteria first and send that in a request in order to get
 * the responses.
 * This param is optional, if omitted the entire store state will be subscribed to.
 *
 * If `false`, we will not log state updates.
 * Logging updates will never go to production even if the value is true.
 * Default is false.
 * This can be helpful in debugging scenarios.
 * @example
 * export class ListViewComponent extends RtComponentThatCanPluckFromStores {
 *   // an example using the options supported. This will pluck the results from the ResultStateStore and log all state updates
 *   ＠PluckFromStoreState(ResultsStateStore, {traversalKey: 'results', logInfo: true})
 *   protected results: ResultsState;
 *
 *   // the options are optional, this will receive the raw state object in its entirety.
 *   ＠PluckFromStoreState(NameStore)
 *   protected names: string[];
 *
 *   constructor(private readonly _resultsStateStore: ResultsStateStore) {
 *     super('ListViewComponent');
 *   }
 * }
 */
export const PluckFromStore = <
  ComponentType extends RtComponentThatCanPluckFromStores,
  StoreType extends Type<RtInjectableStore<T>>,
  T
>(
  storeType: StoreType,
  { traversalKey, logInfo }: IPluckFromStoreOptions<T> = {traversalKey: null, logInfo: false}
): ((target: ComponentType, propertyKey: string) => void) => {
  return (target: ComponentType, propertyKey: string): void => {
    // grab the runtime pre-construction properties from the decorator
    // we do not have a full instance yet as decorators are parsed as
    // part of the construction phase. Grab the data we can from the
    // code being parsed - we have the StoreType, options, the
    // property being decorated, and the class that owns the property
    let properties: IPluckFromStoreMetadata<StoreType, T>[] =
      Reflect.getMetadata(storeMetadataKey, target);

    // next, we add properties to the metadata of the object. This way
    // after construction, we'll be able to use the properties we're
    // finding here on the instance itself.
    // 1. If we've already defined our metadata, push to it.
    // 2. If we have no properties, that means we need to create a
    //  metadata property.
    if (properties) {
      properties.push({ propertyKey, storeType, traversalKey, logInfo });
    } else {
      properties = [{ propertyKey, storeType, traversalKey, logInfo }];
      Reflect.defineMetadata(storeMetadataKey, properties, target);
    }
  };
};

export const getPluckFromComponentProperties = <
  StoreType extends Type<RtInjectableStore<T>>,
  T
>(
  origin: object
): IPluckFromStoreMetadata<StoreType, T>[] => {
  // here we use the internal unique Symbol to let the
  // RtComponentThatCanPluckFromStore retrieve the metadata
  // that was parsed from the decorated properties we added
  // to the object during construction.
  const metadata = Reflect.getMetadata(storeMetadataKey, origin);
  // clean up the metadata, we no longer need it.
  Reflect.deleteMetadata(storeMetadataKey, origin);
  return metadata;
};
