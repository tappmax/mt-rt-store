import {RtLogger} from './rt-logger';
import {InternalGlobalProvider} from '../internal-global-provider';
import {RtLogLevelEnum} from './rt-log-level.enum';
import {RtLogService} from './rt-log-service';
import {RtLogConfig} from './rt-log-config';
import {EMPTY} from 'rxjs';

const setUpConfigSpy = (config: RtLogConfig): void => {
  spyOn(InternalGlobalProvider, 'getRtLogConfig').and.returnValue(config);
};

const setUpLogServiceSpy = (): jasmine.Spy => {
  const service: RtLogService = {
    logToBackend: () => {
    }
  } as any;

  spyOn(InternalGlobalProvider, 'getRtLogService').and.returnValue(service);

  return spyOn(service, 'logToBackend').and.returnValue(EMPTY);
};

const setUpLogConsoleSpy = (): jasmine.Spy => {
  return spyOn(RtLogger as any, '_logToConsole');
};

describe('RtLogger', () => {
  describe('trace()', () => {
    it('should not log when the log level is None', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.None, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.trace('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should not log when the log level is Fatal', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Fatal, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.trace('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should not log when the log level is Error', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Error, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.trace('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should not log when the log level is Warn', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Warn, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.trace('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should not log when the log level is Info', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Info, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.trace('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should not log when the log level is Debug', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Debug, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.trace('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should log when the log level is Trace', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Trace, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.trace('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is All', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.All, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.trace('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });
  });

  describe('debug()', () => {
    it('should not log when the log level is None', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.None, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.debug('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should not log when the log level is Fatal', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Fatal, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.debug('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should not log when the log level is Error', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Error, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.debug('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should not log when the log level is Warn', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Warn, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.debug('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should not log when the log level is Info', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Info, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.debug('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should log when the log level is Debug', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Debug, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.debug('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is Trace', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Trace, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.debug('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is All', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.All, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.debug('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();

      expect(logToConsoleSpy).toHaveBeenCalled();
    });
  });

  describe('info()', () => {
    it('should not log when the log level is None', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.None, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.info('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should not log when the log level is Fatal', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Fatal, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.info('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should not log when the log level is Error', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Error, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.info('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should not log when the log level is Warn', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Warn, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.info('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should log when the log level is Info', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Info, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.info('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is Debug', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Debug, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.info('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is Trace', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Trace, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.info('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();

      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is All', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.All, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.info('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();

      expect(logToConsoleSpy).toHaveBeenCalled();
    });
  });

  describe('warn()', () => {
    it('should not log when the log level is None', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.None, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.warn('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should not log when the log level is Fatal', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Fatal, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.warn('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should not log when the log level is Error', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Error, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.warn('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should log when the log level is Warn', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Warn, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.warn('myMessage');

      expect(logToBackendSpy).toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is Info', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Info, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.warn('myMessage');

      expect(logToBackendSpy).toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is Debug', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Debug, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.warn('myMessage');

      expect(logToBackendSpy).toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is Trace', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Trace, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.warn('myMessage');

      expect(logToBackendSpy).toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is All', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.All, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.warn('myMessage');

      expect(logToBackendSpy).toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should pass the appropriate details to the logToBackend call', () => {
      setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();

      spyOn(RtLogger as any, '_getActiveRoute').and.returnValue('testRoute');
      setUpConfigSpy({logLevel: RtLogLevelEnum.All, logName: 'TestProject'});

      const meta = {details: 'details'};

      const log = new RtLogger('TEST');

      const decoratedMessage = (log as any)._decorateLogMessage('myMessage');

      log.warn('myMessage', meta);

      expect(logToBackendSpy).toHaveBeenCalledWith(RtLogLevelEnum.Warn, decoratedMessage, 'testRoute', meta);
    });
  });

  describe('error()', () => {
    it('should not log when the log level is None', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.None, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.error('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should not log when the log level is Fatal', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Fatal, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.error('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should log when the log level is Error', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Error, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.error('myMessage');

      expect(logToBackendSpy).toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is Warn', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Warn, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.error('myMessage');

      expect(logToBackendSpy).toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is Info', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Info, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.error('myMessage');

      expect(logToBackendSpy).toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is Debug', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Debug, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.error('myMessage');

      expect(logToBackendSpy).toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is Trace', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Trace, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.error('myMessage');

      expect(logToBackendSpy).toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is All', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.All, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.error('myMessage');

      expect(logToBackendSpy).toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should pass the appropriate details to the logToBackend call', () => {
      setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();

      spyOn(RtLogger as any, '_getActiveRoute').and.returnValue('testRoute');
      setUpConfigSpy({logLevel: RtLogLevelEnum.All, logName: 'TestProject'});

      const meta = {details: 'details'};

      const log = new RtLogger('TEST');

      const decoratedMessage = (log as any)._decorateLogMessage('myMessage');

      log.error('myMessage', meta);

      expect(logToBackendSpy).toHaveBeenCalledWith(RtLogLevelEnum.Error, decoratedMessage, 'testRoute', meta);
    });
  });

  describe('fatal()', () => {
    it('should not log when the log level is None', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.None, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.fatal('myMessage');

      expect(logToBackendSpy).not.toHaveBeenCalled();
      expect(logToConsoleSpy).not.toHaveBeenCalled();
    });

    it('should log when the log level is Fatal', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Fatal, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.fatal('myMessage');

      expect(logToBackendSpy).toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is Error', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Error, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.fatal('myMessage');

      expect(logToBackendSpy).toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is Warn', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Warn, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.fatal('myMessage');

      expect(logToBackendSpy).toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is Info', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Info, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.fatal('myMessage');

      expect(logToBackendSpy).toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is Debug', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Debug, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.fatal('myMessage');

      expect(logToBackendSpy).toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is Trace', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.Trace, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.fatal('myMessage');

      expect(logToBackendSpy).toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should log when the log level is All', () => {
      const logToConsoleSpy = setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();
      setUpConfigSpy({logLevel: RtLogLevelEnum.All, logName: 'TestProject'});

      const log = new RtLogger('TEST');

      log.fatal('myMessage');

      expect(logToBackendSpy).toHaveBeenCalled();
      expect(logToConsoleSpy).toHaveBeenCalled();
    });

    it('should pass the appropriate details to the logToBackend call', () => {
      setUpLogConsoleSpy();
      const logToBackendSpy = setUpLogServiceSpy();

      spyOn(RtLogger as any, '_getActiveRoute').and.returnValue('testRoute');
      setUpConfigSpy({logLevel: RtLogLevelEnum.All, logName: 'TestProject'});

      const meta = {details: 'details'};

      const log = new RtLogger('TEST');

      const decoratedMessage = (log as any)._decorateLogMessage('myMessage');

      log.fatal('myMessage', meta);

      expect(logToBackendSpy).toHaveBeenCalledWith(RtLogLevelEnum.Fatal, decoratedMessage, 'testRoute', meta);
    });
  });
});
