import { RtLogService } from './rt-log-service';
import { InternalGlobalProvider } from '../internal-global-provider';
import { RtLogLevelEnum } from './rt-log-level.enum';
import { RtLogConfig } from './rt-log-config';
const isNullOrUndefined = (input: unknown) => input === null || input === undefined;

export class RtLogger {
  private readonly _rtLogService: RtLogService = InternalGlobalProvider.getRtLogService();
  private readonly _rtLogConfig: RtLogConfig = InternalGlobalProvider.getRtLogConfig();

  constructor(private readonly _prefixString: string) {
  }

  private static _logToConsole(logLevel: RtLogLevelEnum, logMessage: string, meta: any): void {
    const dateString = new Date().toISOString();

    switch (logLevel) {
      case RtLogLevelEnum.Warn:
        // eslint-disable-next-line no-console
        console.warn(`${dateString} `, logMessage, meta);
        break;
      case RtLogLevelEnum.Error:
      case RtLogLevelEnum.Fatal:
        // eslint-disable-next-line no-console
        console.error(`${dateString} `, logMessage, meta);
        break;
      case RtLogLevelEnum.Info:
        // eslint-disable-next-line no-console
        console.info(`${dateString} `, logMessage, meta);
        break;
      default:
        // eslint-disable-next-line no-console
        console.log(`${dateString} `, logMessage, meta);
    }
  }

  private static _getActiveRoute(): string {
    return location.pathname + location.search;
  }

  private _decorateLogMessage(logMessage: string): string {
    return `${this._prefixString} - ${logMessage}`;
  }

  /**
   * Logs a Trace message. Trace messages are only logged to the console. This will never
   * be sent to the backend.
   */
  public trace(logMessage: string, meta?: any): void {
    if (this._getLogLevel() > RtLogLevelEnum.Trace) {
      return;
    }

    RtLogger._logToConsole(RtLogLevelEnum.Trace, logMessage, meta);
  }

  /**
   * Logs a Debug message. Debug messages are only logged to the console. This will never
   * be sent to the backend.
   */
  public debug(logMessage: string, meta?: any): void {
    if (this._getLogLevel() > RtLogLevelEnum.Debug) {
      return;
    }

    RtLogger._logToConsole(RtLogLevelEnum.Debug, logMessage, meta);
  }

  /**
   * Logs an Info message. Info messages are only logged to the console. This will never
   * be sent to the backend.
   */
  public info(logMessage: string, meta?: any): void {
    if (this._getLogLevel() > RtLogLevelEnum.Info) {
      return;
    }

    RtLogger._logToConsole(RtLogLevelEnum.Info, logMessage, meta);
  }

  /**
   * Logs a Warn message. Warn messages are always sent to the backend.
   *
   * Warn messages will NOT cause Chaos Alerts.
   *
   * Do not use in areas that will spam logs. If you need to add logging in an area that
   * will spam logs, consider using an Info message and adjusting the project Log Level.
   */
  public warn(logMessage: string, meta?: any): void {
    if (this._getLogLevel() > RtLogLevelEnum.Warn) {
      return;
    }

    RtLogger._logToConsole(RtLogLevelEnum.Warn, logMessage, meta);
    this._rtLogService.logToBackend(RtLogLevelEnum.Warn, this._decorateLogMessage(logMessage), RtLogger._getActiveRoute(), meta).subscribe();
  }

  /**
   * Logs an Error message. Error messages are always sent to the backend.
   *
   * Error messages WILL cause Chaos Alerts.
   *
   * Do not use in areas that will spam logs. If you need to add logging in an area that
   * will spam logs, consider using an Info message and adjusting the project Log Level.
   */
  public error(logMessage: string, meta?: any): void {
    if (this._getLogLevel() > RtLogLevelEnum.Error) {
      return;
    }

    RtLogger._logToConsole(RtLogLevelEnum.Error, logMessage, meta);
    this._rtLogService.logToBackend(RtLogLevelEnum.Error, this._decorateLogMessage(logMessage), RtLogger._getActiveRoute(), meta).subscribe();
  }

  /**
   * Logs a Fatal message. Fatal messages are always sent to the backend.
   *
   * Fatal messages will cause Chaos Alerts.
   *
   * Do not use in areas that will spam logs. If you need to add logging in an area that
   * will spam logs, consider using an Info message and adjusting the project Log Level.
   */
  public fatal(logMessage: string, meta?: any): void {
    if (this._getLogLevel() > RtLogLevelEnum.Fatal) {
      return;
    }

    RtLogger._logToConsole(RtLogLevelEnum.Fatal, logMessage, meta);
    // we are intentionally not managing the subscription here. Even if the logger gets destroyed,
    // we want our http request to complete
    this._rtLogService.logToBackend(RtLogLevelEnum.Fatal, this._decorateLogMessage(logMessage), RtLogger._getActiveRoute(), meta).subscribe();
  }

  /**
   * If an app hasn't configured their log config let's not log anything.
   * This will also aide in helping unit tests not break when a component
   * logs something during a test.
   */
  private _getLogLevel(): RtLogLevelEnum {
    const config = this._rtLogConfig;
    if (isNullOrUndefined(config)) {
      RtLogger._logToConsole(RtLogLevelEnum.Debug, 'RtLogConfig is not configured, skipping logging attempt.', null);
    }
    return config ? config.logLevel : RtLogLevelEnum.None;
  }
}
