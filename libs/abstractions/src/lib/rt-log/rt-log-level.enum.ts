export enum RtLogLevelEnum {
  All = 0,

  /** The most detailed level of log output for detailed trace messages */
  Trace = 50,

  /** For debug messages */
  Debug = 100,

  /** For general information that is not an error or warning but is not debug info either */
  Info = 200,

  /** For Warnings. */
  Warn = 300,

  /** For Errors */
  Error = 400,

  /** For fatal and critical failures */
  Fatal = 500,

  /** Should never be included in log output  */
  None = 1000
}
