import { getSafeDecimal, formatNumbers } from '@/helper/decimal'
import { AssetSetListItem } from '..'

interface Props {
  assetItem: AssetSetListItem
}

export default function CoinAssetItem(props: Props) {
  const { assetItem } = props
  /** 通过汇率计算 USD */
  const getComputedAmount = (item: AssetSetListItem) => {
    return getSafeDecimal(item?.amount || 0).mul(item?.rate || 0)
  }

  return (
    <div className="bg-white h-[88px] mx-3 rounded-xl my-4 shadow-sm flex items-center justify-between px-4">
      <div className="flex items-center">
        <img src={assetItem?.coinDetail?.colorful_image_url} alt="" className="rounded-full w-12" />
        <div className="ml-4">{assetItem?.currency}</div>
      </div>
      <div>
        <div className="text-right">{formatNumbers(assetItem?.amount, assetItem?.coinDetail?.display_decimal)}</div>
        <div className="mt-0.5 text-gray-400 text-right">$ {formatNumbers(getComputedAmount(assetItem))}</div>
      </div>
    </div>
  )
}
