/** 用户资产相关详情 */
export interface WalletBalanceItem {
  /** 币种 */
  currency: string
  /** 数量 */
  amount: number
}
/** 用户资产相关列表 */
export interface WalletBalance {
  ok: boolean
  warning: string
  wallet: WalletBalanceItem[]
}

export interface Rates {
  /** 数量 */
  amount: string 
  /** 汇率 */
  rate: string 
}
  
/** 相关币种兑换详情 */
export interface LiveRateItem {
  /** 目前币种 */
  from_currency: string 
  /** 兑换币种 */
  to_currency: string 
  /** 汇率列表 */
  rates: Rates[]
  time_stamp: number
}


/** 相关币种兑换列表 */
export interface LiveRateItemList {
  ok: boolean
  warning: string
  tiers: LiveRateItem[]
}

/** 所有币种详情 */
export interface AllCurrenciesItem {
  coin_id: string
  name: string
  symbol: string
  token_decimal: number
  contract_address: string
  withdrawal_eta: string[]
  colorful_image_url: string
  gray_image_url: string
  has_deposit_address_tag: boolean
  min_balance: number
  blockchain_symbol: string
  trading_symbol: string
  code: string
  explorer: string
  is_erc20: boolean
  gas_limit: number
  token_decimal_value: string
  display_decimal: number
  supports_legacy_address: boolean
  deposit_address_tag_name: string
  deposit_address_tag_type: string
  num_confirmation_required: number
}

/** 所有币种详情列表 */
export interface AllCurrenciesList {
  currencies: AllCurrenciesItem[]
  total: number
  ok: boolean
}