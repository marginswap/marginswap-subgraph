import { Address, BigInt } from '@graphprotocol/graph-ts'
import { Lending, AddToClaim, SubtractFromClaim } from '../../generated/Lending/Lending'
import { Balance, AggregatedBalance } from '../../generated/schema'
import { ZERO_BI } from '../../utils/constants'

function handleClaimChange(contract: Lending, topic: Address, claimant: Address, timestamp: BigInt): void {
  let lenderBalanceId = claimant.toHex() + '-' + topic.toHex()
  let aggregatedBalanceId = topic.toHex() + '-BOND_DEPOSIT'
  let lenderBalance = Balance.load(lenderBalanceId)
  let newBalance = contract.hourlyBondAccounts(topic, claimant).value0
  let aggregatedBalance = AggregatedBalance.load(aggregatedBalanceId)
  let originalBalance = ZERO_BI

  if (lenderBalance) {
    originalBalance = lenderBalance.balance
  }

  if (aggregatedBalance) {
    aggregatedBalance.balance = aggregatedBalance.balance.minus(originalBalance).plus(newBalance)
    aggregatedBalance.updatedAt = timestamp
  } else {
    aggregatedBalance = new AggregatedBalance(aggregatedBalanceId)
    aggregatedBalance.balance = newBalance
    aggregatedBalance.balanceType = 'BOND_DEPOSIT'
    aggregatedBalance.contract = contract._address
    aggregatedBalance.token = topic
    aggregatedBalance.createdAt = timestamp
  }

  aggregatedBalance.save()

  if (lenderBalance) {
    lenderBalance.balance = newBalance
    lenderBalance.updatedAt = timestamp
  } else {
    lenderBalance = new Balance(lenderBalanceId)
    lenderBalance.trader = claimant
    lenderBalance.token = topic
    lenderBalance.balance = newBalance
    lenderBalance.balanceType = 'BOND_DEPOSIT'
    lenderBalance.contract = contract._address
    lenderBalance.createdAt = timestamp
  }

  lenderBalance.save()
}

export function handleAddToClaim(event: AddToClaim): void {
  let contract = Lending.bind(event.address)
  let topic = event.params.topic
  let claimant = event.params.claimant
  let timestamp = event.block.timestamp

  handleClaimChange(contract, topic, claimant, timestamp)
}

export function handleSubtractFromClaim(event: SubtractFromClaim): void {
  let contract = Lending.bind(event.address)
  let topic = event.params.topic
  let claimant = event.params.claimant
  let timestamp = event.block.timestamp

  handleClaimChange(contract, topic, claimant, timestamp)
}
