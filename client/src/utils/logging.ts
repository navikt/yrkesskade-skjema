import { LogService } from "../services/LogService";
import { LogMessage } from "../types/log-message";

export const logMessage = (message: string) => {
  const messageObject: LogMessage = {
    message: message,
    timestamp: new Date().toISOString(),
    severity: 'INFO'
  }
  new LogService().log(messageObject);
}

export const logErrorMessage = (message: string) => {
  const messageObject: LogMessage = {
    message: message,
    timestamp: new Date().toISOString(),
    severity: 'ERROR'
  }
  new LogService().log(messageObject);
}

export const logWarningMessage = (message: string) => {
  const messageObject: LogMessage = {
    message: message,
    timestamp: new Date().toISOString(),
    severity: 'WARN'
  }
  new LogService().log(messageObject);
}
