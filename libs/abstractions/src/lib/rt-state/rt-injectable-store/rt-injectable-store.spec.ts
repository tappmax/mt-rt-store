import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { RtInjectableStore } from './rt-injectable-store';
import { RtBehaviorSubject } from '@rt/factotum';
import { RtStoreContainer } from '../rt-store-container.ts/rt-store-container';
import { RtStoreSourceEngine } from '../rt-store-source-engine/rt-store-source-engine';

interface ITest {
  readonly prop: string;
}
class RtStoreTest extends RtInjectableStore<Readonly<ITest>> {}

class TestContainer extends RtStoreContainer {
  constructor() {
    super('Test');
  }
}

class TestEngine extends RtStoreSourceEngine {
  private _source = new RtBehaviorSubject<unknown>();
  constructor(store: RtStoreTest, container: TestContainer) {
    super(container);
    this.initialize(this, {
      store: store,
      source: this._source,
    });
  }
  /** */
  public updateSource(newSource): void {
    this._source.next(newSource);
  }
}

describe(`RtInjectableStore`, () => {
  it(`should receive state changes`, fakeAsync(() => {
    const store = new RtStoreTest();
    let tester: ITest;
    const engine = new TestEngine(store, new TestContainer());
    expect(tester).toEqual(undefined);
    store.state$.subscribe((newState) => (tester = newState));
    tick();
    expect(tester).toEqual(null);
    engine.updateSource({ prop: 'test' });
    tick();
    expect(tester.prop).toEqual('test');
  }));

  it(`should only allow one initialization`, fakeAsync(() => {
    const store = new RtStoreTest();
    new TestEngine(store, new TestContainer());
    expect(() => new TestEngine(store, new TestContainer())).toThrowError(
      'State source already bound.'
    );
    discardPeriodicTasks();
  }));
});
