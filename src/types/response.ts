// Typed / Globals
export type ApiResponse<Type> = {
  __requested_url__: string;
  Status: 'OK' | 'ERROR';
  xmlns: string;
  Errors: string;
  Warnings: string;
  RequestedCommand: string;
  Server: string;
  ExecutionTime: number;
  GMTTimeDifference: string;
  CommandResponse: Type;
};

type ResponsePaging = {
  TotalItems: number;
  CurrentPage: number;
  PageSize: number;
};

// Individual
export type Domain_GetListResponse = {
  Type: string;
  DomainGetListResult: {
    ID: number;
    Name: string;
    User: string;
    Created: string;
    Expires: string;
    IsExpired: boolean;
    IsLocked: boolean;
    AutoRenew: boolean;
    WhoisGuard: string;
    IsPremium: boolean;
    IsOurDNS: boolean;
  }[];
  Paging: ResponsePaging;
};

export type Domain_CheckResponse = {
  Type: string;
  DomainCheckResult: {
    Domain: string;
    Available: boolean;
    ErrorNo: number;
    Description: string;
    IsPremiumName: boolean;
    PremiumRegistrationPrice: number;
    PremiumRenewalPrice: number;
    PremiumRestorePrice: number;
    PremiumTransferPrice: number;
    IcannFee: number;
    EapFee: number;
  }[];
};
