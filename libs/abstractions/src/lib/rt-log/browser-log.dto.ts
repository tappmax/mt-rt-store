import {RtLogLevelEnum} from './rt-log-level.enum';

export class BrowserLogDto {
  /** The name of the log */
  public readonly logName: string;

  /** The log level */
  public readonly level: RtLogLevelEnum;

  /** The log message */
  public readonly message: string;

  /** The route that was active at the time the log was written */
  public readonly activeRoute: string;

  /** Any additional details */
  public readonly meta: any;
}
