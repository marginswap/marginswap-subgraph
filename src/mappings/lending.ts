import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  Lending,
  AddToClaim,
  SubtractFromClaim
} from "../../generated/Lending/Lending"
import { Balance, AggregatedBalance } from "../../generated/schema"

function handleClaimChange(contract: Lending, topic: Address, claimant: Address): void {
  let lenderBalanceId = claimant.toHex() + '-' + topic.toHex()
  let aggregatedBalanceId = topic.toHex() + '-BOND_DEPOSIT'
  let lenderBalance = Balance.load(lenderBalanceId)
  let newBalance = contract.hourlyBondAccounts(topic, claimant).value0
  let aggregatedBalance = AggregatedBalance.load(aggregatedBalanceId)
  let originalBalance = BigInt.fromString('0')

  if (lenderBalance) {
    originalBalance = lenderBalance.balance
  }

  if (aggregatedBalance) {
    aggregatedBalance.balance = aggregatedBalance.balance.minus(originalBalance).plus(newBalance)
  } else {
    aggregatedBalance = new AggregatedBalance(aggregatedBalanceId)
    aggregatedBalance.balance = newBalance
    aggregatedBalance.balanceType = 'BOND_DEPOSIT'
    aggregatedBalance.contract = contract._address
    aggregatedBalance.token = topic
  }

  aggregatedBalance.save()

  if (lenderBalance) {
    lenderBalance.balance = newBalance
  } else {
    lenderBalance = new Balance(lenderBalanceId)
    lenderBalance.trader = claimant
    lenderBalance.token = topic
    lenderBalance.balance = newBalance
    lenderBalance.balanceType = 'BOND_DEPOSIT'
    lenderBalance.contract = contract._address
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
