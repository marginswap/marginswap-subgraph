import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  Lending,
  AddToClaim,
  SubtractFromClaim
} from "../../generated/Lending/Lending"
import { LenderBalance, AggregatedTokenLendingBalance } from "../../generated/schema"

function handleClaimChange(contract: Lending, topic: Address, claimant: Address): void {
  let lenderBalanceId = claimant.toHex() + '-' + topic.toHex()
  let lenderBalance = LenderBalance.load(lenderBalanceId)
  let newBalance = contract.hourlyBondAccounts(topic, claimant).value0
  let aggregatedBalance = AggregatedTokenLendingBalance.load(topic.toHex())
  let originalBalance = BigInt.fromString('0')
  
  if (lenderBalance) {
    originalBalance = lenderBalance.balance
  }

  if (aggregatedBalance) {
    aggregatedBalance.balance = aggregatedBalance.balance.minus(originalBalance).plus(newBalance)
  } else {
    aggregatedBalance = new AggregatedTokenLendingBalance(topic.toHex())
    aggregatedBalance.balance = newBalance
  }

  aggregatedBalance.save()

  if (lenderBalance) {
    lenderBalance.balance = newBalance
  } else {
    lenderBalance = new LenderBalance(lenderBalanceId)
    lenderBalance.trader = claimant
    lenderBalance.token = topic
    lenderBalance.balance = newBalance
  }

  lenderBalance.save()
}

export function handleAddToClaim(event: AddToClaim): void {
  let contract = Lending.bind(event.address)
  let topic = event.params.topic
  let claimant = event.params.claimant

  handleClaimChange(contract, topic, claimant)
}

export function handleSubtractFromClaim(event: SubtractFromClaim): void {
  let contract = Lending.bind(event.address)
  let topic = event.params.topic
  let claimant = event.params.claimant

  handleClaimChange(contract, topic, claimant)
}
