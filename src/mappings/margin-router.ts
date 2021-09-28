import { Address } from '@graphprotocol/graph-ts'
import { AccountUpdated, MarginTrade } from '../../generated/MarginRouter/MarginRouter'
import { CrossMarginTrading } from '../../generated/CrossMarginTrading/CrossMarginTrading'
import { PriceAware } from '../../generated/MarginRouter/PriceAware'
import { Balance, AggregatedBalance, Swap, DailySwapVolume, MarginswapDayData } from '../../generated/schema'
import { ONE_BI, ZERO_BD, ZERO_BI } from '../../utils/constants'

/*
  NOTE: This address must be manually updated to match the CrossMarginTrading
  contract on the network you're deploying to.
  See deployment instructions in the README for more details.
*/
const CROSS_MARGIN_CONTRACT_ADDRESS = '0xfDa3e986e38A913aC3300C2eff168d0D69d698B1'

export function handleAccountUpdated(event: AccountUpdated): void {
  let contractAddress = Address.fromHexString(CROSS_MARGIN_CONTRACT_ADDRESS) as Address
  let contract = CrossMarginTrading.bind(contractAddress)
  let trader = event.params.trader

  /* Create  CROSS_MARGIN_HOLDING balance records */
  let holdingAmounts = contract.getHoldingAmounts(trader)
  let holdingTokenAddresses = holdingAmounts.value0
  let holdingBalances = holdingAmounts.value1

  for (let i = 0; i < holdingTokenAddresses.length; i++) {
    let token = holdingTokenAddresses[i]
    let balance = holdingBalances[i]
    let balanceEntityId = trader.toHexString() + '-' + token.toHexString() + '-CROSS_MARGIN_HOLDING'
    let balanceEntity = Balance.load(balanceEntityId)

    /* Upsert aggregated balance for this token */
    let aggregatedHoldingBalanceId = token.toHexString() + '-CROSS_MARGIN_HOLDING'
    let aggregatedHoldingBalanceEntity = AggregatedBalance.load(aggregatedHoldingBalanceId)
    let originalHoldingBalance = ZERO_BI

    if (balanceEntity) {
      originalHoldingBalance = balanceEntity.balance
    }

    if (aggregatedHoldingBalanceEntity) {
      aggregatedHoldingBalanceEntity.balance = aggregatedHoldingBalanceEntity.balance.minus(originalHoldingBalance).plus(balance)
      aggregatedHoldingBalanceEntity.updatedAt = event.block.timestamp
    } else {
      aggregatedHoldingBalanceEntity = new AggregatedBalance(aggregatedHoldingBalanceId)
      aggregatedHoldingBalanceEntity.balance = balance
      aggregatedHoldingBalanceEntity.balanceType = 'CROSS_MARGIN_HOLDING'
      aggregatedHoldingBalanceEntity.contract = contract._address
      aggregatedHoldingBalanceEntity.token = token
      aggregatedHoldingBalanceEntity.createdAt = event.block.timestamp
    }

    aggregatedHoldingBalanceEntity.save()

    /* Upsert the balance entity for this trader/token/balanceType */
    if (balanceEntity) {
      balanceEntity.balance = balance
      balanceEntity.updatedAt = event.block.timestamp
    } else {
      balanceEntity = new Balance(balanceEntityId)
      balanceEntity.token = token
      balanceEntity.trader = trader
      balanceEntity.balance = balance
      balanceEntity.balanceType = 'CROSS_MARGIN_HOLDING'
      balanceEntity.contract = contract._address
      balanceEntity.createdAt = event.block.timestamp
    }

    balanceEntity.save()
  }

  /* Create  CROSS_MARGIN_DEBT balance records */
  let borrowAmounts = contract.getBorrowAmounts(trader)
  let borrowTokenAddresses = borrowAmounts.value0
  let borrowBalances = borrowAmounts.value1

  for (let i = 0; i < borrowTokenAddresses.length; i++) {
    let token = borrowTokenAddresses[i]
    let balance = borrowBalances[i]
    let balanceEntityId = trader.toHexString() + '-' + token.toHexString() + '-CROSS_MARGIN_DEBT'
    let balanceEntity = Balance.load(balanceEntityId)

    /* Upsert aggregated balance for this token */
    let aggregatedBorrowBalanceId = token.toHexString() + '-CROSS_MARGIN_DEBT'
    let aggregatedBorrowBalanceEntity = AggregatedBalance.load(aggregatedBorrowBalanceId)
    let originalBorrowBalance = ZERO_BI

    if (balanceEntity) {
      originalBorrowBalance = balanceEntity.balance
    }

    if (aggregatedBorrowBalanceEntity) {
      aggregatedBorrowBalanceEntity.balance = aggregatedBorrowBalanceEntity.balance.minus(originalBorrowBalance).plus(balance)
    } else {
      aggregatedBorrowBalanceEntity = new AggregatedBalance(aggregatedBorrowBalanceId)
      aggregatedBorrowBalanceEntity.balance = balance
      aggregatedBorrowBalanceEntity.balanceType = 'CROSS_MARGIN_DEBT'
      aggregatedBorrowBalanceEntity.contract = contract._address
      aggregatedBorrowBalanceEntity.token = token
      aggregatedBorrowBalanceEntity.createdAt = event.block.timestamp
    }

    aggregatedBorrowBalanceEntity.save()

    if (balanceEntity) {
      balanceEntity.balance = balance
    } else {
      balanceEntity = new Balance(balanceEntityId)
      balanceEntity.token = token
      balanceEntity.trader = trader
      balanceEntity.balance = balance
      balanceEntity.balanceType = 'CROSS_MARGIN_DEBT'
      balanceEntity.contract = contract._address
      balanceEntity.createdAt = event.block.timestamp
    }

    balanceEntity.save()
  }
}

export function handleMarginTrade(event: MarginTrade): void {
  let contractAddress = Address.fromHexString(CROSS_MARGIN_CONTRACT_ADDRESS) as Address
  let priceAwareContract = PriceAware.bind(contractAddress)

  let swap = new Swap(event.transaction.hash.toHexString())
  swap.trader = event.params.trader
  swap.fromAmount = event.params.fromAmount
  swap.toAmount = event.params.toAmount
  swap.fromToken = event.params.fromToken
  swap.toToken = event.params.toToken
  swap.createdAt = event.block.timestamp
  swap.type = 'MARGIN'
  swap.save()

  let timestamp = event.block.timestamp.toI32()
  let dayID = timestamp / 86400
  let volumeRecordId = dayID.toString() + '-' + event.params.fromToken.toHexString() + '-MARGIN'
  let tokenDailyVolume = DailySwapVolume.load(volumeRecordId)
  let marginswapDayData = MarginswapDayData.load(dayID.toString())

  if (tokenDailyVolume) {
    tokenDailyVolume.volume = tokenDailyVolume.volume.plus(event.params.fromAmount)
    tokenDailyVolume.updatedAt = event.block.timestamp
  } else {
    tokenDailyVolume = new DailySwapVolume(volumeRecordId)
    tokenDailyVolume.token = event.params.fromToken
    tokenDailyVolume.volume = event.params.fromAmount
    tokenDailyVolume.type = 'MARGIN'
    tokenDailyVolume.createdAt = event.block.timestamp
  }

  let tokenPriceInPeg = priceAwareContract.viewCurrentPriceInPeg(event.params.fromToken, event.params.fromAmount).toBigDecimal()
  let pastMarginswapDayData = getLatestMarginSwapDayData(18797, dayID)
  let totalVolumeUSD = ZERO_BD

  if (pastMarginswapDayData) {
    totalVolumeUSD = pastMarginswapDayData.totalVolumeUSD
  }

  if (marginswapDayData) {
    marginswapDayData.dailyVolumeUSD = marginswapDayData.dailyVolumeUSD.plus(tokenPriceInPeg)
    marginswapDayData.totalVolumeUSD = marginswapDayData.totalVolumeUSD.plus(totalVolumeUSD)
    marginswapDayData.txCount = marginswapDayData.txCount.plus(ONE_BI)
  } else {
    marginswapDayData = new MarginswapDayData(dayID.toString())
    marginswapDayData.dailyVolumeUSD = tokenPriceInPeg
    marginswapDayData.totalVolumeUSD = totalVolumeUSD
    marginswapDayData.txCount = ONE_BI
    marginswapDayData.createdAt = event.block.timestamp
  }

  tokenDailyVolume.save()
  marginswapDayData.save()
}

function getLatestMarginSwapDayData(lastDayCheck: number, startDayCheck: number): MarginswapDayData | null {
  for (let i = startDayCheck - 1; i >= lastDayCheck; i--) {
    let marginswapDayData = MarginswapDayData.load(startDayCheck.toString())

    if (marginswapDayData) {
      return marginswapDayData
    }
  }

  return null
}
