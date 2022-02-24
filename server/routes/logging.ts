import { Express} from 'express';
import { LogMessage } from '../../client/src/types/log-message';

export const configureLoggingEndpoint = (app: Express): Express => {
  app.post(`/log`, handleLogging);
  return app;
};

const handleLogging = (req, res) => {
  const logMessage = req.body as LogMessage;

  switch (logMessage.severity) {
    // tslint:disable-next-line:no-console
    case 'INFO' : console.log(logMessage.message); break;
    // tslint:disable-next-line:no-console
    case 'WARN' : console.warn(logMessage.message); break;
    // tslint:disable-next-line:no-console
    case 'ERROR' : console.error(logMessage.message); break;
    // tslint:disable-next-line:no-console
    default : console.debug(logMessage.message);
  }

  res.sendStatus(200);
}

