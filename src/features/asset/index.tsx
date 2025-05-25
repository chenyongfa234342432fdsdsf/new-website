import { useState } from 'react'
import { AllCurrenciesItem, LiveRateItem, Rates, WalletBalanceItem } from '@/typings/api/asset'
import { useMount, useUpdateEffect } from 'ahooks'
import { getAllCurrenciesRequest, getLiveRateItemListRequest, getWalletBalanceRequest } from '@/apis/asset'
import { getSafeDecimal, formatNumbers } from '@/helper/decimal'
import CoinAssetItem from './coin-asset-item'
import styles from './index.module.css'

export type AssetSetListItem = WalletBalanceItem & {
  rate: string
  coinDetail: AllCurrenciesItem
}

export default function Asset() {
  /** 用户资产列表 */
  const [walletBalanceList, setWalletBalanceList] = useState<WalletBalanceItem[]>([])
  /** 币种汇率列表 */
  const [liveRatesList, setLiveRatesList] = useState<LiveRateItem[]>([])
  /** 币种详情列表 */
  const [allCurrenciesList, setAllCurrenciesList] = useState<AllCurrenciesItem[]>([])
  /** 聚合后的资产列表 */
  const [assetSetList, setAssetSetList] = useState<AssetSetListItem[]>([])
  /** 总资产 */
  const [totalAssets, setTotalAssets] = useState<number>(0)
  const getWalletBalanceRequestFn = async () => {
    const { ok, wallet } = await getWalletBalanceRequest()
    if (ok && wallet && Array.isArray(wallet)) {
      setWalletBalanceList(wallet)
    }
  }

  const getLiveRateItemListRequestFn = async () => {
    const { ok, tiers } = await getLiveRateItemListRequest()
    if (ok && tiers && Array.isArray(tiers)) {
      setLiveRatesList(tiers)
    }
  }

  const getAllCurrenciesRequestFn = async () => {
    const { ok, currencies } = await getAllCurrenciesRequest()
    if (ok && currencies && Array.isArray(currencies)) {
      setAllCurrenciesList(currencies)
    }
  }

  const getJudgeUseCurrency = (rates: Rates[]) => {
    /** 我看有的币对有多个汇率，没太清楚到底是取哪个，但是我看大部分只有一个 所以默认取第一个 */
    return rates?.[0]?.rate || 0
  }

  useUpdateEffect(() => {
    if (walletBalanceList?.length > 0 && liveRatesList?.length > 0 && allCurrenciesList?.length > 0) {
      /** 计算总资产 */
      let totalAssetsNumber = 0

      const assetResult = walletBalanceList?.map(item => {
        /** 获取币种汇率 */
        const rate =
          getJudgeUseCurrency(
            liveRatesList?.find(ratesItem => ratesItem?.from_currency === item?.currency)?.rates || []
            // item?.amount
          ) || '0'

        totalAssetsNumber = getSafeDecimal(totalAssetsNumber)
          ?.add(getSafeDecimal(rate || 0)?.mul(item?.amount || 0))
          ?.toNumber()
        return {
          ...item,
          rate,
          /** 筛选每个币种详情 */
          coinDetail:
            allCurrenciesList?.find(currenciesItem => currenciesItem?.coin_id === item?.currency) ||
            ({} as AllCurrenciesItem),
        }
      })
      setTotalAssets(totalAssetsNumber)
      setAssetSetList(assetResult)
    }
  }, [walletBalanceList, liveRatesList, allCurrenciesList])

  useMount(() => {
    getLiveRateItemListRequestFn()
    getWalletBalanceRequestFn()
    getAllCurrenciesRequestFn()
  })

  return (
    <div className={styles.scoped}>
      <div className="h-full w-full bg-blue-900 absolute top-0 left-0 -z-1"></div>
      <div className="flex flex-col h-full">
        <div className="mt-[120px] mb-[80px] flex justify-center flex-1">
          <div className="flex items-center text-4xl">
            <span className="pr-1 font-bold text-gray-500">$</span>
            <span className="pr-1 font-bold text-white">{formatNumbers(totalAssets, 2)}</span>
            <span className="pr-1 font-bold text-gray-500">USD</span>
          </div>
        </div>
        <div className="bg-gray-100 rounded-t-xl py-2.5 h-[560px] overflow-auto">
          {assetSetList?.map(item => {
            return (
              <div key={item?.currency}>
                <CoinAssetItem assetItem={item} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
