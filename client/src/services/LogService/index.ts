import axios from "axios";
import { LogMessage } from "../../types/log-message";

const apiUrl = '/log';

export class LogService {

  log = (message: LogMessage) => {
    axios.post(apiUrl, JSON.stringify(message), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
