const ERROR_MESSAGES = {
  LOGIN: 'Login failed. Please try again',
  invalidPassword:
    'Passwords should be of minimum eight characters, and must contain a mix of upper case, lower case, numbers and special characters.',
  requiredField: 'Please enter the required field',
};

const LOCALE_ID = {
  en: 'en-US',
  fr: 'fr-FR',
};

const REGEX = {
  password: /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,16}$)/,
  mobile: /^[1-9][0-9]{6,14}$/,
};

const size = {
  mobileS: '425px',
  mobileM: '576px',
  mobileL: '767px',
  ipad: '991px',
  tablet: '1024px',
  smlaptop: '1280px',
  laptop: '1440px',
  desktop: '1920px',
};

const DEVICE = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  ipad: `(max-width: ${size.ipad})`,
  tablet: `(max-width: ${size.tablet})`,
  smlaptop: `(max-width: ${size.smlaptop})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(max-width: ${size.desktop})`,
};

const sortOrder = {
  ASC: 1,
  DESC: -1,
};

const CATEGORY_FILTER_PROPERTY = [
  {
    key: 'Property Purchase',
    value: 'PROPERTY_PURCHASE',
  },
  {
    key: 'Rent Received',
    value: 'RENT_RECEIVED',
  },
  // {
  //   key: 'Rent Fee',
  //   value: 'RENT_FEES',
  // },
  {
    key: 'Rent Fee',
    value: 'RENT_FEE',
  },
  {
    key: 'Government Fee',
    value: 'GOVERNMENT_FEE',
  },
  {
    key: 'Miscelleneous Cost',
    value: 'MISCELLENOUS_COST',
  },
  {
    key: 'Sales Proceeds',
    value: 'SALES_PROCEEDS',
  },
  {
    key: 'Slice Fee',
    value: 'SLICE_FEE',
  },
  {
    key: 'Reverse Fund',
    value: 'REVERSE_FUND',
  },
];

const CATEGORY: any = {
  RENT_RECEIVED: 'Rent Received',
  ADD_FUND: 'Add Fund',
  PAYIN: 'Pay In',
  REVERSE_FUND: 'Reverse Fund',
  INVEST: 'Invest',
  WITHDRAW: 'Withdraw',
  PAYOUT: 'Pay Out',
  REFUND: 'Refund',
  PROPERTY_PURCHASE: 'Property Purchase',
  SLICE_FEE: 'Slice Fee',
  GOVERNMENT_FEE: 'Government Fee',
  MISCELLENOUS_COST: 'Miscellenous Cost',
  SALES_PROCEEDS: 'Sales Proceeds',
  RENT_FEE: 'Rent Fee',
  RENTAL_DIVIDEND: 'Rental Dividend',
  SETTLEMENT: 'Settlement',
  REDEEM_COUPON_REFUND: 'Redeem Coupon Refund',
  REDEEM_COUPON: 'Redeem Coupon',
  RENT_FEES: 'Rent Fees',
  REDEEM_COUPON_WITHDRAW: 'Redeem Coupon Withdraw',
  SLICE_FEES: 'Slice Fees',
};

const MODULES: any = {
  DASHBOARD: 'Dashboard',
  USER_MANAGEMENT: 'User Management',
  USER_WALLET: 'User Wallet',
  PROPERTY_MANAGEMENT: 'Property Management',
  PROPERTY_WALLET: 'Property Wallet',
  SLICE_WALLET: 'Slice Wallet',
  EXTERNAL_ACCOUNT_MANAGEMENT: 'External Account Management',
  COUPON_MANAGEMENT: 'Coupon Management',
  CONTENT_MANAGEMENT: 'Content Managemnet',
  SETTINGS: 'Settings',
  ROLES_MANAGEMENT: 'Roles Management',
};

const USER_WALLET_CATEGORY = [
  {
    key: 'ADD_FUND',
    label: 'Add Fund',
  },
  {
    key: 'INVEST',
    label: 'Invest',
  },
  {
    key: 'RENTAL_DIVIDEND',
  },
];

const ROLE_STATUS: any = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  BLOCKED: 'Inactive',
  UN_BLOCKED: 'Active',
};

const SOURCE: any = {
  BANK_TRANSFER: 'Bank Transfer',
  CREDIT_CARD: 'Credit Card',
  DEBIT_CARD: 'Debit Card',
  CASH: 'Cash',
  CHEQUE: 'Cheque',
};

const FROM: any = {
  UserWallet: 'User Wallet',
  BankTransfer: 'Bank Transfer',
};
const TO: any = {
  User_Wallet: 'User Wallet',
  Bank_Transfer: 'Bank Transfer',
};

const TYPE: any = {
  DEBIT: 'Debit',
  CREDIT: 'Credit',
};

const STATUS: any = {
  COMPLETED: 'Completed',
  PENDING: 'Pending',
  FAILED: 'Failed',
  LOCKED: 'Locked',
  UNLOCKED: 'Unlocked',
  IN_PROGRESS: 'In Progress',
};

const PLATFORM: any = {
  '1': 'Android',
  '2': 'IOS',
  '3': 'Web',
};

const SOURCE_FILTER = [
  {
    key: 'Bank Transfer',
    value: 'BANK_TRANSFER',
  },
  {
    key: 'Debit Card',
    value: 'DEBIT_CARD',
  },
  {
    key: 'Credit Card',
    value: 'CREDIT_CARD',
  },
  {
    key: ' Cash',
    value: 'CASH',
  },
  {
    key: ' Cheque',
    value: 'CHEQUE',
  },
];

const CATEGORY_FILTER_USER = [
  {
    key: 'Add Fund',
    value: 'ADD_FUND',
  },
  {
    key: 'Reverse Fund',
    value: 'REVERSE_FUND',
  },
];

const PROMOTION_TYPE: any = {
  GLOBAL_USER: 'Global Users',
  USER_SPECIFIC: 'User Specific',
};
const PROMOTION_STATUS: any = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  REDEEMED: 'Redeemed',
  EXPIRED: 'Expired',
};

const PERMISSIONS: any = {
  DASHBOARD: 'Dashboard',
  USER_LISTING: 'User Listing',
  USER_EXPORT: 'User Export',
  USER_DETAILS_REGISTRATION: 'User Details - Registration',
  USER_DETAIL_OVERRIDE_EMAIL: 'User Details - Override Email',
  USER_DETAIL_KYC: 'User Details - KYC',
  USER_DETAIL_OVERRIDE_KYC: 'User Details - Override KYC',
  USER_DETAIL_USER_WALLET: 'User Details - User Wallet',
  USER_DETAIL_EXPORT_USER_WALLET: 'User Details - Export User Wallet',
  USER_DETAIL_ADD_TRANSACTION: 'User Details - Add Transaction',
  USER_DETAIL_UPLOAD_BANK_STATEMENT: 'User Details - Upload Bank Statement',
  USER_DETAIL_BULK_COMPLETE: 'User Details - Bulk Complete',
  USER_DETAIL_COMPLETE_TRANSATION: 'User Details - Complete Transaction',

  PROPERTY_LISTING: 'Property Listing',
  ADD_PROPERTY: 'Add property',
  EDIT_PROPERTY: 'Edit Property',
  PROPERTY_MGMT_VIEW_TRANSACTION: 'View Transactions',
  PROPERTY_MGMT_EXPORT_TRANSACTION: 'Export Transactions',
  PROPERTY_MGMT_ADD_TRANSACTION: 'Add Transaction',
  PROPERTY_MGMT_FINAL_SETTLEMENT: 'Final Settlement',
  PROPERTY_MGMT_DISTRIBUTE_DIVIDEND: 'Distribute Dividend',
  PROPERTY_MGMT_UPLOAD_BANK_STATEMENT: 'Upload Bank Statement',
  PROPERTY_MGMT_COMPLETE_TRANSACTION: 'Complete Transaction',
  PROPERTY_MGMT_BULK_COMPLETE: 'Bulk Complete',

  VIEW_USER_WALLET: 'View User Wallet',
  EXPORT_USER_WALLET: 'Export User Wallet',
  USER_WALLET_ADD_TRANSACTION: 'User wallet Add Transaction',
  USER_WALLET_UPLOAD_BANK_STATEMENT: 'Upload Bank Statement',
  USER_WALLET_BULK_COMPLETE: 'Bulk Complete',
  USER_WALLET_COMPLETE_TRANSACTION: 'Complete Transaction',

  VIEW_PROPERTY_WALLET: 'View Property Wallet',
  EXPORT_PROPERTY_WALLET: 'Export Property Wallet',
  PROPERT_WALLET_ADD_TRANSACTION: 'Property Wallet Add Transaction',
  PROPERT_WALLET_FINAL_SETTLEMENT: 'Property Final Settlement',
  PROPERT_WALLET_DISTRIBUTE_DIVIDEND: 'Property Distribute Dividend',
  PROPERT_WALLET_UPLOAD_BANK_STATEMENT: 'Property Upload Bank Statement',
  PROPERT_WALLET_COMPLETE_TRANSACTION: 'Property Complete Transaction',
  PROPERT_WALLET_BULK_COMPLETE: 'Property Bulk Complete',

  VIEW_SLICE_WALLET: 'View Slice Wallet',
  EXPORT_SLICE_WALLET: 'Export Slice Wallet',
  SLICE_WALLET_ADD_TRANSACTION: 'Slice Wallet Add Transaction',
  SLICE_WALLET_UPLOAD_BANK_STATEMENT: 'Slice Wallet Upload Bank Statement',
  SLICE_WALLET_COMPLETE_TRANSACTION: 'Slice Wallet Complete Transaction',
  SLICE_WALLET_BULK_COMPLETE: 'Slice Wallet Bulk Complete',

  VIEW_EXTERNAL_ACCOUNT: 'View External Account',
  EXPORT_EXTERNAL_ACCOUNT: 'Export External Account',
  ADD_EXTERNAL_ACCOUNT: 'Add External Account',
  EXTERNAL_ACCOUNT_VIEW_TYPES: 'External Account View Types',
  EXTERNAL_ACCOUNT_EXPORT_TYPES: 'External Account Export View Types',
  EXTERNAL_ACCOUNT_ADD_TYPES: 'External Account Add Type',

  VIEW_REFERRAL_CAMPAIGN: 'View Referral Campaign',
  ADD_REFERRAL_COUPONS: 'Add Referral Coupons',
  ADD_REFERRAL_CAMPAIGN: 'Add Referral Campaign',
  UPDATE_REFERRAL_CAMPAIGN: 'Update Referral Campaign',
  ACTIVATE_INACTIVATE_REFERRAL_CAMPAIGN: 'Activate/Inactivate Referral Campaign',
  EXPORT_REFERRAL_CAMPAIGN: 'Export Referral Campaign',
  ACTIVATE_INACTIVATE_REFERRAL_COUPONS: 'Activate/Inactivate Referral Campaign',
  VIEW_GLOBAL_COUPONS: 'View Global Coupons',
  ADD_GLOBAL_COUPONS: 'Add Global Coupons',
  EXPORT_GLOBAL_COUPONS: 'Export Global Coupons',
  ACTIVATE_INACTIVATE_GLOBAL_COUPONS: 'Activate/Inactivate Global Coupons',
  VIEW_USER_SPECIFIC_COUPONS: 'View User Specific Coupons',
  ADD_USER_SPECIFIC_COUPONS: 'Add User Specific Coupons',
  EXPORT_USER_SPECIFIC_COUPONS: 'Export User Specific Coupons',
  ACTIVATE_INACTIVATE_USER_SPECIFIC_COUPONS: 'Activate/Inactivate User Specific Coupons',

  CMS_VIEW_LISTING: 'View Content Management Listing',
  CMS_EXPORT_LISTING: 'Export CMS Listing',
  CMS_ADD_NEW_ITEM: 'Add New item',
  CMS_UPDATE_NEW_ITEM: 'Update New item',
  ACTIVATE_INACTIVATE_ITEMS: 'Activate/Inactivate items',

  SETTING_VIEW_NAME_AND_PROFILE_IMAGE: 'View Name And Profile Image',
  SETTING_CHANGE_NAME_AND_PROFILE_IMAGE: 'Change Name And Profile Image',
  SETTING_CHANGE_PASSWORD: 'Change Password',

  ROLES_MGMT_VIEW_ROLES: 'View Roles',
  ROLES_MGMT_ADD_ROLES: 'Add Roles',
  ROLES_MGMT_ACTIVATE_INACTIVATE_ROLE: 'Activate/Inactivate Role',
  ROLES_MGMT_UPDATE_ROLE: 'Update Role',
  ROLES_MGMT_VIEW_SUB_ADMIN: 'View Sub - Admin',
  ROLES_MGMT_ADD_SUB_ADMIN: 'Add Sub - Admin',
  ROLES_MGMT_ACTIVATE_INACTIVATE_ADMIN: 'Activate/Inactivate Sub - Admin',
  ROLES_MGMT_UPDATE_SUB_ADMIN: 'Update Sub - Admin',
};

const DASHBOARD_PERMISSION: any = {
  DASHBOARD: 'Dashboard',
};

const USER_PERMISSION: any = {
  USER_LISTING: 'User Listing',
  USER_EXPORT: 'User Export',
  USER_DETAILS_REGISTRATION: 'User Details - Registration',
  USER_DETAIL_OVERRIDE_EMAIL: 'User Details - Override Email',
  USER_DETAIL_KYC: 'User Details - KYC',
  USER_DETAIL_OVERRIDE_KYC: 'User Details - Override KYC',
  USER_DETAIL_USER_WALLET: 'User Details - User Wallet',
  USER_DETAIL_EXPORT_USER_WALLET: 'User Details - Export User Wallet',
  USER_DETAIL_ADD_TRANSACTION: 'User Details - Add Transaction',
  USER_DETAIL_UPLOAD_BANK_STATEMENT: 'User Details - Upload Bank Statement',
  USER_DETAIL_BULK_COMPLETE: 'User Details - Bulk Complete',
  USER_DETAIL_COMPLETE_TRANSATION: 'User Details - Complete Transaction',
};

const PROPERTY_MANAGEMENT_PERMISSIONS = {
  PROPERTY_LISTING: 'Property Listing',
  ADD_PROPERTY: 'Add property',
  EDIT_PROPERTY: 'Edit Property',
  PROPERTY_MGMT_VIEW_TRANSACTION: 'View Transactions',
  PROPERTY_MGMT_EXPORT_TRANSACTION: 'Export Transactions',
  PROPERTY_MGMT_ADD_TRANSACTION: 'Add Transaction',
  PROPERTY_MGMT_FINAL_SETTLEMENT: 'Final Settlement',
  PROPERTY_MGMT_DISTRIBUTE_DIVIDEND: 'Distribute Dividend',
  PROPERTY_MGMT_UPLOAD_BANK_STATEMENT: 'Upload Bank Statement',
  PROPERTY_MGMT_COMPLETE_TRANSACTION: 'Complete Transaction',
  PROPERTY_MGMT_BULK_COMPLETE: 'Bulk Complete',
};

const USER_WALLET_PERMISSIONS: any = {
  VIEW_USER_WALLET: 'View User Wallet',
  EXPORT_USER_WALLET: 'Export User Wallet',
  USER_WALLET_ADD_TRANSACTION: 'User wallet Add Transaction',
  USER_WALLET_UPLOAD_BANK_STATEMENT: 'Upload Bank Statement',
  USER_WALLET_BULK_COMPLETE: 'Bulk Complete',
  USER_WALLET_COMPLETE_TRANSACTION: 'Complete Transaction',
};

const PROPERT_WALLET_PERMISSIONS: any = {
  VIEW_PROPERTY_WALLET: 'View Property Wallet',
  EXPORT_PROPERTY_WALLET: 'Export Property Wallet',
  PROPERT_WALLET_ADD_TRANSACTION: 'Property Wallet Add Transaction',
  PROPERT_WALLET_FINAL_SETTLEMENT: 'Property Final Settlement',
  PROPERT_WALLET_DISTRIBUTE_DIVIDEND: 'Property Distribute Dividend',
  PROPERT_WALLET_UPLOAD_BANK_STATEMENT: 'Property Upload Bank Statement',
  PROPERT_WALLET_COMPLETE_TRANSACTION: 'Property Complete Transaction',
  PROPERT_WALLET_BULK_COMPLETE: 'Property Bulk Complete',
};

const EXTERNAL_ACCOUNT_PERMISSIONS: any = {
  VIEW_EXTERNAL_ACCOUNT: 'View External Account',
  EXPORT_EXTERNAL_ACCOUNT: 'Export External Account',
  ADD_EXTERNAL_ACCOUNT: 'Add External Account',
  EXTERNAL_ACCOUNT_VIEW_TYPES: 'External Account View Types',
  EXTERNAL_ACCOUNT_EXPORT_TYPES: 'External Account Export View Types',
  EXTERNAL_ACCOUNT_ADD_TYPE: 'External Account Add Type',
};

const COUPON_MANAGEMENT_PERMISSIONS: any = {
  VIEW_REFERRAL_CAMPAIGN: 'View Referral Campaign',
  ADD_REFERRAL_COUPONS: 'Add Referral Coupons',
  ADD_REFERRAL_CAMPAIGN: 'Add Referral Campaign',
  UPDATE_REFERRAL_CAMPAIGN: 'Update Referral Campaign',
  ACTIVATE_INACTIVATE_REFERRAL_CAMPAIGN: 'Activate/Inactivate Referral Campaign',
  EXPORT_REFERRAL_CAMPAIGN: 'Export Referral Campaign',
  ACTIVATE_INACTIVATE_REFERRAL_COUPONS: 'Activate/Inactivate Referral Campaign',
  VIEW_GLOBAL_COUPONS: 'View Global Coupons',
  ADD_GLOBAL_COUPONS: 'Add Global Coupons',
  EXPORT_GLOBAL_COUPONS: 'Export Global Coupons',
  ACTIVATE_INACTIVATE_GLOBAL_COUPONS: 'Activate/Inactivate Global Coupons',
  VIEW_USER_SPECIFIC_COUPONS: 'View User Specific Coupons',
  ADD_USER_SPECIFIC_COUPONS: 'Add User Specific Coupons',
  EXPORT_USER_SPECIFIC_COUPONS: 'Export User Specific Coupons',
  ACTIVATE_INACTIVATE_USER_SPECIFIC_COUPONS: 'Activate/Inactivate User Specific Coupons',
};

const CONTENT_MANAGEMENT_PERMISSIONS: any = {
  CMS_VIEW_LISTING: 'View Content Management Listing',
  CMS_EXPORT_LISTING: 'Export CMS Listing',
  CMS_ADD_NEW_ITEM: 'Add New item',
  CMS_UPDATE_NEW_ITEM: 'Update New item',
  ACTIVATE_INACTIVATE_ITEMS: 'Activate/Inactivate items',
};

const SETTINGS_PERMISSIONS: any = {
  SETTING_VIEW_NAME_AND_PROFILE_IMAGE: 'View Name And Profile Image',
  SETTING_CHANGE_NAME_AND_PROFILE_IMAGE: 'Change Name And Profile Image',
  SETTING_CHANGE_PASSWORD: 'Change Password',
};

const ROLES_MANAGEMENT_PERMISSIONS: any = {
  ROLES_MGMT_VIEW_ROLES: 'View Roles',
  ROLES_MGMT_ADD_ROLES: 'Add Roles',
  ROLES_MGMT_ACTIVATE_INACTIVATE_ROLE: 'Activate/Inactivate Role',
  ROLES_MGMT_UPDATE_ROLE: 'Update Role',
  ROLES_MGMT_VIEW_SUB_ADMIN: 'View Sub - Admin',
  ROLES_MGMT_ADD_SUB_ADMIN: 'Add Sub - Admin',
  ROLES_MGMT_ACTIVATE_INACTIVATE_ADMIN: 'Activate/Inactivate Sub - Admin',
  ROLES_MGMT_UPDATE_SUB_ADMIN: 'Update Sub - Admin',
};

const SLICE_WALLET_PERMISSIONS: any = {
  VIEW_SLICE_WALLET: 'View Slice Wallet',
  EXPORT_SLICE_WALLET: 'Export Slice Wallet',
  SLICE_WALLET_ADD_TRANSACTION: 'Slice Wallet Add Transaction',
  SLICE_WALLET_UPLOAD_BANK_STATEMENT: 'Slice Wallet Upload Bank Statement',
  SLICE_WALLET_COMPLETE_TRANSACTION: 'Slice Wallet Complete Transaction',
  SLICE_WALLET_BULK_COMPLETE: 'Slice Wallet Bulk Complete',
};

export default {
  DASHBOARD_PERMISSION,
  SLICE_WALLET_PERMISSIONS,
  ROLES_MANAGEMENT_PERMISSIONS,
  SETTINGS_PERMISSIONS,
  USER_PERMISSION,
  CONTENT_MANAGEMENT_PERMISSIONS,
  COUPON_MANAGEMENT_PERMISSIONS,
  EXTERNAL_ACCOUNT_PERMISSIONS,
  USER_WALLET_PERMISSIONS,
  PROPERT_WALLET_PERMISSIONS,
  PROPERTY_MANAGEMENT_PERMISSIONS,
  ROLE_STATUS,
  STATUS,
  TYPE,
  TO,
  FROM,
  ERROR_MESSAGES,
  LOCALE_ID,
  DEVICE,
  REGEX,
  sortOrder,
  CATEGORY,
  SOURCE,
  USER_WALLET_CATEGORY,
  PLATFORM,
  CATEGORY_FILTER_PROPERTY,
  SOURCE_FILTER,
  CATEGORY_FILTER_USER,
  PROMOTION_TYPE,
  PROMOTION_STATUS,
  MODULES,
  PERMISSIONS,
};
