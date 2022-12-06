import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import NetworkResponse from './NetworkResponse';

const API_ENDPOINT = 'https://www.paw-5.com/';

interface Request {
  method: 'GET' | 'POST',
  host: string,
  options: AxiosRequestConfig,
}

class Network {
  request?: Request;

  response?: NetworkResponse;

  get = async (host: string, options: AxiosRequestConfig) => {
    this.request = {
      method: 'GET',
      host,
      options,
    };
    try {
      const response = await axios.get(API_ENDPOINT + host, options);
      this.response = new NetworkResponse(response);
      return this.response;
    } catch(e) {
      if (e instanceof AxiosError && e.response) {
        this.response = new NetworkResponse(e.response);
        return this.response;
      }
      throw e;
    }
  };

  post = async (host, body, options) => {
    this.request = {
      method: 'POST',
      host,
      options,
    };
    try {
      const response = await axios.post(API_ENDPOINT + host, body, options);
      this.response = new NetworkResponse(response);
    return this.response;
    } catch(e) {
      if (e instanceof AxiosError && e.response) {
        this.response = new NetworkResponse(e.response);
        return this.response;
      }
      throw e;
    }
  };
}

export default Network;
