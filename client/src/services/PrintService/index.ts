import axios, { AxiosResponse } from "axios";
import { Skademelding } from "../../api/yrkesskade";

const apiUrl = '/print';

export class PrintService {
  print = (skademelding: Skademelding): Promise<AxiosResponse<any, any>> => {
    return axios.post(apiUrl, JSON.stringify(skademelding), {
      params: {
        cacheBustTimestamp: Date.now(), // prevents IE cache problems on re-download
      },
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'blob'
    });
  }
}
