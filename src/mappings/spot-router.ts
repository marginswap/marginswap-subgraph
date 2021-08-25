import {
  SpotTrade
} from "../../generated/SpotRouter/SpotRouter"
import { Swap, DailySwapVolume } from "../../generated/schema"

export function handleSpotTrade(event: SpotTrade): void {
  let swap = new Swap(event.transaction.hash.toHexString())
  swap.trader = event.params.trader
  swap.fromAmount = event.params.fromAmount
  swap.toAmount = event.params.toAmount
  swap.fromToken = event.params.fromToken
  swap.toToken = event.params.toToken
  swap.createdAt = event.block.timestamp
  swap.type = 'SPOT'
  swap.save()

  let timestamp = event.block.timestamp.toI32()
  let dayID = timestamp / 86400
  let volumeRecordId = dayID.toString() + '-' + event.params.fromToken.toHexString() + '-SPOT'
  let tokenDailyVolume = DailySwapVolume.load(volumeRecordId)

  if (tokenDailyVolume) {
    tokenDailyVolume.volume = tokenDailyVolume.volume.plus(event.params.fromAmount)
    tokenDailyVolume.updatedAt = event.block.timestamp
  }else {
    tokenDailyVolume = new DailySwapVolume(volumeRecordId)
    tokenDailyVolume.token = event.params.fromToken
    tokenDailyVolume.volume = event.params.fromAmount
    tokenDailyVolume.type = 'SPOT'
    tokenDailyVolume.createdAt = event.block.timestamp
  }

  tokenDailyVolume.save()
}
