import { RtCommonEventBus } from './rt-common-event-bus';
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

type TestActionType = 'create' | 'update' | 'delete';
interface TestPayload {
  readonly id: number;
  readonly description: string;
}


class RtEventBusTest extends RtCommonEventBus<TestActionType, TestPayload> {}

describe(`RtEventBus`, () => {
  it(`should dispatch and listen`, fakeAsync(() => {
    const eventBus = new RtEventBusTest();
    const testContainer = new TestContainer();
    let tester: ITest;
    eventBus.listen(testContainer).subscribe(({payload}) => (tester = {prop: payload.description}));
    expect(tester).toEqual(undefined);
    eventBus.dispatch({ action: 'create', payload: {id: 1, description: 'newProp'} });
    tick();
    expect(tester.prop).toEqual('newProp');
  }));

  it(`should only allow one observer`, fakeAsync(() => {
    const eventBus = new RtEventBusTest();
    let tester: ITest;
    try {
      const testContainer = new TestContainer();
      eventBus.listen(testContainer).subscribe(({payload}) => (tester = {prop: payload.description}));
      eventBus.listen(testContainer).subscribe(({payload}) => (tester = {prop: payload.description}));
    } catch (err) {
      expect(err).toEqual('Max observer limit of one reached.');
    } finally {
      discardPeriodicTasks();
    }
  }));
});
