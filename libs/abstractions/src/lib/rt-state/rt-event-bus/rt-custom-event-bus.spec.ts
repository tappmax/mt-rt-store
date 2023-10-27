import { RtCustomEventBus } from './rt-custom-event-bus';
import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { RtStoreContainer } from '../rt-store-container.ts/rt-store-container';

interface ITest {
  prop: string;
}

class TestContainer extends RtStoreContainer {
  constructor() {
    super('Test');
  }
}

class RtEventBusTest extends RtCustomEventBus<ITest> {}

describe(`RtEventBus`, () => {
  it(`should dispatch and listen`, fakeAsync(() => {
    const eventBus = new RtEventBusTest();
    const testContainer = new TestContainer();
    let tester: ITest;
    eventBus.listen(testContainer).subscribe((newProp) => (tester = newProp));
    expect(tester).toEqual(undefined);
    eventBus.dispatch({ prop: 'newProp' });
    tick();
    expect(tester.prop).toEqual('newProp');
  }));

  it(`should only allow one observer`, fakeAsync(() => {
    const eventBus = new RtEventBusTest();
    let tester: ITest;
    try {
      const testContainer = new TestContainer();
      eventBus.listen(testContainer).subscribe((newProp) => (tester = newProp));
      eventBus.listen(testContainer).subscribe((newProp) => (tester = newProp));
    } catch (err) {
      expect(err).toEqual('Max observer limit of one reached.');
    } finally {
      discardPeriodicTasks();
    }
  }));
});
