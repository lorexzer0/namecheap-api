import { AxiosInstance } from 'axios';
import { parse } from 'fast-xml-parser';
import { decode as he_decode } from 'he';

const XML_PARSER_OPTIONS = {
  attributeNamePrefix: '',
  textNodeName: '#text',
  ignoreAttributes: false,
  ignoreNameSpace: false,
  allowBooleanAttributes: true,
  parseNodeValue: true,
  parseAttributeValue: true,
  trimValues: true,
  cdataTagName: '__cdata', // default is 'false'
  cdataPositionChar: '\\c',
  parseTrueNumberOnly: false,
  arrayMode: false, // "strict"
  attrValueProcessor: (val: any, attrName: any) => {
    if (['Created', 'Expires'].includes(attrName)) {
      // return new Date(val).toLocaleDateString();
      return val;
    } else {
      return he_decode(val, { isAttributeValue: true });
    }
  }, // default is a=>a
  tagValueProcessor: (val: any, tagName: any) => he_decode(val), // default is a=>a
  stopNodes: ['parse-me-as-string'],
};

export class RequestInitiator {
  constructor(protected instance: AxiosInstance, protected config: Map<string, string | boolean>) {}

  protected async _get<Type>(
    searchParams: { [name: string]: string | undefined },
    urlString: string = '',
  ): Promise<Type> {
    const url = new URL(urlString, this.instance.defaults.baseURL ?? '');

    Object.keys(searchParams).forEach((key) => {
      url.searchParams.set(key, searchParams[key] ?? '');
    });

    const response = await this.instance.get(url.href);
    const jsonObj: Type = { ...parse(response.data, XML_PARSER_OPTIONS), __requested_url__: url.href };
    return jsonObj;
  }

  protected _combineParams(
    params: { [key: string]: any },
    command: string | undefined,
  ): { [name: string]: string | undefined } {
    const searchParams: { [name: string]: string | undefined } = {};

    Object.keys(params).forEach((key) => {
      searchParams[key] = params[key];
    });

    this.config.forEach((val, key) => {
      if (typeof val === 'string') {
        searchParams[key] = val;
      }
    });
    searchParams.Command = command;

    return searchParams;
  }
}
