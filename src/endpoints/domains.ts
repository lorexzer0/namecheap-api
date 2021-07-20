import { RequestInitiator } from '../requestInitiator';
import {
  Domain_CheckParams,
  Domain_GetContactsParams,
  Domain_GetListParams,
  Domain_ReactivateParams,
} from '../types/params';
import { ApiResponse, Domain_CheckResponse, Domain_GetListResponse } from '../types/response';

export class Domains extends RequestInitiator {
  private commands = new Map<string, string>([
    ['getList', 'namecheap.domains.getList'],
    ['getContacts', 'namecheap.domains.getContacts'],
    ['getTldList', 'namecheap.domains.getTldList'],
    ['check', 'namecheap.domains.check'],
    ['reactivate', 'namecheap.domains.reactivate'],
  ]);

  /**
   * Returns a list of domains for the particular user
   * @see {@link https://www.namecheap.com/support/api/methods/domains/get-list | the getList command}
   */
  public getList = async (
    params: Domain_GetListParams = {
      ListType: 'ALL',
      Page: 1,
      PageSize: 20,
    },
  ) => {
    return await this._get<ApiResponse<Domain_GetListResponse>>(
      this._combineParams(params, this.commands.get('getList')),
    );
  };

  /**
   * Gets contact information for the requested domain
   * @see {@link https://www.namecheap.com/support/api/methods/domains/get-contacts | the getContacts command}
   */
  public getContacts = async (params: Domain_GetContactsParams) => {
    return await this._get(this._combineParams(params, this.commands.get('getContacts')));
  };

  /**
   * Returns a list of TLDs
   * @see {@link https://www.namecheap.com/support/api/methods/domains/get-tld-list | the getTldList command}
   */
  public getTldList = async () => {
    return await this._get(this._combineParams({}, this.commands.get('getTldList')));
  };

  /**
   * Checks the availability of domains
   * @see {@link https://www.namecheap.com/support/api/methods/domains/check | the check command}
   */
  public check = async (params: Domain_CheckParams) => {
    return await this._get<ApiResponse<Domain_CheckResponse>>(this._combineParams(params, this.commands.get('check')));
  };

  /**
   * Reactivates an expired domain
   * @see {@link https://www.namecheap.com/support/api/methods/domains/reactivate | the reactivate command}
   */
  public reactivate = async (params: Domain_ReactivateParams) => {
    return await this._get(this._combineParams(params, this.commands.get('reactivate')));
  };
}
