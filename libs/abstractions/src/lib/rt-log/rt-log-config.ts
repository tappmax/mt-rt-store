import {RtLogLevelEnum} from './rt-log-level.enum';

export class RtLogConfig {
  /**
   * Controls which messages will actually be logged. For example, if you have your logLevel
   * set to Warn, then Warn and all levels above (Error, and Fatal) messages will be logged,
   * but nothing below Warn (Info, Debug, Trace) will be logged
   */
  public readonly logLevel: RtLogLevelEnum;

  /**
   * The project wide log name. This should usually align with the project name (eg: Realtracs.Angular.Listings,
   * Realtracs.Angular.Listings.ListingsWidgets, Realtracs.Angular.UserOrganization). This allows us
   * to organize our logs in a simple way.
   */
  public readonly logName: string;
}
