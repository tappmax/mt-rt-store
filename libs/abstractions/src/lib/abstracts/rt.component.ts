import {RtLogger} from '../rt-log/rt-logger';
import { AutoUnsubscribe } from '../utils/auto-unsubscribe';

export abstract class RtComponent extends AutoUnsubscribe() {
  /** The logger */
  protected readonly log: RtLogger;

  protected constructor(componentName: string) {
    super();
    this.log = new RtLogger(componentName);
  }
}
