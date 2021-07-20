export type Domain_GetListParams = {
  ListType?: "ALL" | "EXPIRING" | "EXPIRED";
  SearchTerm?: string;
  Page?: number;
  PageSize?: number;
  SortBy?:
    | "NAME"
    | "NAME_DESC"
    | "EXPIREDATE"
    | "EXPIREDATE_DESC"
    | "CREATEDATE"
    | "CREATEDATE_DESC";
};

export type Domain_GetContactsParams = {
  DomainName: string;
};

export type Domain_CheckParams = {
  DomainList: string[];
};

export type Domain_ReactivateParams = {
  DomainName: string;
  PromotionCode?: string;
  YearsToAdd?: number;
  IsPremiumDomain?: boolean;
  PremiumPrice?: number | any;
};
