import { PluckFromStore, RtComponentThatCanPluckFromStores, RtInjectableStore } from '@rt/abstractions';

class TestStore extends RtInjectableStore<{testStoreProp: string}>{}

class PluckTestComponent extends RtComponentThatCanPluckFromStores {

  @PluckFromStore(TestStore, { logInfo: true })
  protected readonly testProperty: string;

  /** @inheritDoc */
  public rtOnInit(): void {
  }

}

/**
 * Don't want to depend on angular, this is just to prove out TS not breaking
 */
