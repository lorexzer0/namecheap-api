import { NameCheapAPIConfig } from './types/global';
import axios, { AxiosInstance } from 'axios';
import { Domains } from './endpoints/domains';
import { RequestInitiator } from './requestInitiator';

export class NameCheapAPI {
  private ri: RequestInitiator;

  public domains: Domains;

  protected instance: AxiosInstance;
  protected config = new Map<string, string | boolean>([
    ['ApiUser', ''],
    ['UserName', ''],
    ['ApiKey', ''],
    ['Sandbox', true],
    ['ClientIp', ''],
  ]);
  protected static = new Map<string, string>([
    ['sandboxUrl', 'https://api.sandbox.namecheap.com/xml.response'],
    ['liveUrl', 'https://api.namecheap.com/xml.response'],
  ]);

  constructor(config?: NameCheapAPIConfig) {
    if (config) {
      this.config = new Map(Object.keys(config).map((key) => [key, (config as any)[key]]));
    }

    this.config.set('UserName', this.config.get('ApiUser') ?? '');

    let url: string = '';
    if (this.config.get('Sandbox')) {
      url = this.static.get('sandboxUrl') ?? '';
    } else {
      url = this.static.get('liveUrl') ?? '';
    }

    this.instance = axios.create({
      timeout: 30000,
      baseURL: url,
    });

    this.ri = new RequestInitiator(this.instance, this.config);

    this.domains = new Domains(this.instance, this.config);
  }

  // Free functions (RequestInitiator functions are protected so this can't work)
  // public callCommand = async (
  //   commandName: string,
  //   params: {[key: string]: string}
  // ) => {
  //   return this.ri._get(this.ri._combineParams(params, commandName));
  // }
}
