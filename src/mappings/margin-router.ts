import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AccountUpdated
} from "../../generated/MarginRouter/MarginRouter"
import {
  CrossMarginTrading,
} from "../../generated/CrossMarginTrading/CrossMarginTrading"
import { Balance, AggregatedBalance } from "../../generated/schema"

export function handleAccountUpdated(event: AccountUpdated): void {
  /* get the cross margin trading contract */
  let contractAddress = Address.fromHexString('0x06Bd4fb41eA58Db06EfCF2c03C13aE333696DDb3') as Address
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
    let originalHoldingBalance = BigInt.fromString('0')

    if (balanceEntity) {
      originalHoldingBalance = balanceEntity.balance
    }

    if (aggregatedHoldingBalanceEntity) {
      aggregatedHoldingBalanceEntity.balance = aggregatedHoldingBalanceEntity.balance.minus(originalHoldingBalance).plus(balance)
    } else {
      aggregatedHoldingBalanceEntity = new AggregatedBalance(aggregatedHoldingBalanceId)
      aggregatedHoldingBalanceEntity.balance = balance
      aggregatedHoldingBalanceEntity.balanceType = 'CROSS_MARGIN_HOLDING'
      aggregatedHoldingBalanceEntity.contract = contract._address
    }

    aggregatedHoldingBalanceEntity.save()

    /* Upsert the balance entity for this trader/token/balanceType */
    if (balanceEntity) {
      balanceEntity.balance = balance
    } else {
      balanceEntity = new Balance(balanceEntityId)
      balanceEntity.token = token
      balanceEntity.trader = trader
      balanceEntity.balance = balance
      balanceEntity.balanceType = 'CROSS_MARGIN_HOLDING'
      balanceEntity.contract = contract._address
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
    let originalBorrowBalance = BigInt.fromString('0')

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
    }

    balanceEntity.save()
  }


}
