import {Injectable} from '@angular/core';
import {HttpService} from '@rt/http';
import {RtLogConfig} from './rt-log-config';
import {RtLogLevelEnum} from './rt-log-level.enum';
import {BrowserLogDto} from './browser-log.dto';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RtLogService {
  constructor(private _http: HttpService,
              private _logConfig: RtLogConfig) {
  }

  /**
   * Logs to the backend (as well as to the console)
   */
  public logToBackend(level: RtLogLevelEnum, message: string, activeRoute: string, meta: any): Observable<void> {
    const browserLogMessage: BrowserLogDto = {
      logName: this._logConfig.logName,
      level,
      meta,
      message,
      activeRoute
    };

    return this._http.post('/api/devops/browser-logs', browserLogMessage).pipe(
      // we intentionally catch errors here. If the HTTP call fails, we want
      // to fail silently
      catchError(() => of(null))
    );
  }
}
