import { AbstractType, Injector, NgZone } from '@angular/core';
import { RtLogService } from './rt-log/rt-log-service';
import { RtLogConfig } from './rt-log/rt-log-config';

export class InternalGlobalProvider {

  /** this gets set in the rt-base module by casting to an any */
  private static _injector: Injector = null;

  private static _tryGetFromInjector<T>(token: AbstractType<T>): T {
    // this is needed or else unit tests will blow up for all components
    // extending RtComponent
    if (!InternalGlobalProvider._injector) {
      return null;
    }
    return InternalGlobalProvider._injector.get(token);
  }

  /** get the instance of RtLogService */
  public static getRtLogService(): RtLogService {
    return InternalGlobalProvider._tryGetFromInjector(RtLogService);
  }

  /** get the instance of RtLogService */
  public static getRtLogConfig(): RtLogConfig {
    return InternalGlobalProvider._tryGetFromInjector(RtLogConfig);
  }

  /** get the instance of RtLogService */
  public static getNgZone(): NgZone {
    return InternalGlobalProvider._tryGetFromInjector(NgZone);
  }
}
