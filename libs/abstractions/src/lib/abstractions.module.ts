import {Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RtLogConfig} from './rt-log/rt-log-config';
import {RtLogService} from './rt-log/rt-log-service';
import {InternalGlobalProvider} from './internal-global-provider';
import { RtHttpModule } from '@rt/http';

@NgModule({
  imports: [
    CommonModule,
    RtHttpModule
  ],
  providers: [
    RtLogService,
    RtLogConfig
  ]
})
export class AbstractionsModule {
  constructor(private injector: Injector) {    // Create global Service Injector.
    (InternalGlobalProvider as any)._injector = this.injector;
  }

  // noinspection JSUnusedGlobalSymbols - used in external modules
  /**
   * Should be imported in the App Module of every project. Provides base functionality
   * for Rt Components and Logging, etc.
   */
  public static forRoot(config: RtLogConfig): ModuleWithProviders<AbstractionsModule> {
    return {
      ngModule: AbstractionsModule,
      providers: [
        {provide: RtLogConfig, useValue: config}
      ]
    };
  }
}
