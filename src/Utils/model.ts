export type LoginModel = {
  data: any;
};

export type ForgotModel = {
  email: string;
};
export type EditPropertyModel = {
  data: object;
};
export type AddPropertyModel = {
  data: object;
};
export type UserFilterModel = {
  loading: boolean;
  error: string;
  total: number;
  pageNo: number;
  limit: number;
  totalPage: number;
  filterKeys?: any;
};

export type UserManagementModel = {
  loading: boolean;
  data: any;
  error: string;
  total: number;
  pageNo: number;
  limit: number;
  totalPage: number;
  key: any;
  userWalletData: {
    data: any;
    error: string;
    total: number;
    pageNo: number;
    limit: number;
    totalPage: number;
    capitalAppreciation: number;
    investmentAmount: number;
    noOfInvestedProperties: number;
    portfolioValue: number;
    rentRecieved: number;
    walletBalance: number;
    isKYCVerified: boolean;
  };
};

export type PropertyFilterModel = {
  filters: {
    pageNo: number;
    limit: number;
    searchKey: string;
    sortBy: string;
    sortOrder: number;
    listingFromDate: number;
    listingToDate: number;
    fundingTargetFromDate: number;
    fundingTargetToDate: number;
    status: string;
    subscribedFrom: string;
    subscribedTo: string;
  };
};
export type PropertyFavoriteModel = {
  loading: boolean;
  total: number;
  pageNo: number;
  limit: number;
  totalPage: number;
};
export type UserDetail = {
  data?: [];
  idVerificationData?: [];
  amlStatus?: '';
  addressVerificationData?: [];
  loading?: boolean;
  transactionDetailData?: [];
  kycHistory?: [];
};
export type PropertyDetail = {
  data: [];
  favoriteData: [];
};
export type SPVModal = {
  data: [];
  detailData: [];
};

export type fetchUserListDataModel = {
  pageNo?: number | any;
  userId?: string;
  limit?: number;
  searchKey?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: number;
  fromDate?: number | any;
  toDate?: number | any;
  type?: string;
  category?: string | any;
  isEmailVerified?: string;
  isKYCVerified?: string;
  walletBalanceFrom?: string;
  walletBalanceTo?: string;
};
export type fetchUserDetailDataModel = {
  userId: string;
  pageNo?: number | any;
  limit?: number;
  searchKey?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: number;
  type?: string;
  category?: string | any;
};

export type IdVerificationDataModel = {
  idVerificationCompleted: boolean;
  idVerificationDocuments: [];
  userId: string;
};
export type AmlDataModel = {
  amlCheckCompleted: boolean;
  userId: string;
};

export type AddressVerificationDataModel = {
  addressVerificationCompleted: boolean;
  addressVerificationDocuments: [];
  userId: string;
};
export type EmailVerificationDataModel = {
  isEmailVerified: boolean;
  userId: string;
};

export type UserWalletStatusData = {
  notes?: string;
  confirmationDate: string;
  referenceId: string;
  confirmationDocuments: any;
};

export type fetchPropertyListDataModel = {
  pageNo?: number | any;
  userId?: string;
  limit?: number;
  searchKey?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: number;
  listingFromDate?: number | any;
  listingToDate?: number | any;
  fundingTargetFromDate?: number | any;
  fundingTargetToDate?: number | any;
  subscribedFrom?: number | string | any;
  subscribedTo?: number | string | any;
};

export type CommonValuesModel = {
  pageNo?: number;
  limit?: number;
  searchKey?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: number;
  type?: string;
};
