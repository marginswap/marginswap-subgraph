import { BigInt, log } from "@graphprotocol/graph-ts"
import {
  MarginRouterIncentive,
  AddToClaim,
  SubtractFromClaim
} from "../../generated/MarginRouterIncentive/MarginRouterIncentive"
import { LenderBalance, AggregatedTokenLendingBalance } from "../../generated/schema"

export function handleAddToClaim(event: AddToClaim): void {
  // let contract = MarginRouterIncentive.bind(event.address)
  // let contractName = contract._name
  // let topic = event.params.topic
  // let claimant = event.params.claimant
  // let amount = event.params.amount
  // let balanceEntity = Balance.load(???)

  // let account = Account.load(claimant.toHex())
  // let 
  // if (account == null) {
  //   account = new Account(claimant.toHex())
  //   // account.save()
  // }


  // let lenderBalanceId = claimant.toHex() + '-' + topic.toHex()
  // let lenderBalance = LenderBalance.load(lenderBalanceId)
  
  // if (!lenderBalance) {
  //   lenderBalance = new LenderBalance(lenderBalanceId)
  //   lenderBalance.trader = claimant
  //   lenderBalance.token = topic
  //   lenderBalance.balance = amount
  //   lenderBalance.save()
  // }

  // if (contractName === 'Lending') {
  //   // let newBalance = contract.call('hourlyBondAccounts', '?', [topic, claimant])
  //   let newBalance = contract.
  // }

  // if (contractName === 'MarginRouter') {
  //   if (balanceEntity == null) {
  //     balanceEntity = new Balance(event.transaction.hash.toHex())
  //   }
  //   balanceEntity.traderAddress = claimant.toHex()
  //   balanceEntity.token = topic
  //   // balanceEntity.balance = contract.call('getBalanceInToken')
  //   balanceEntity.balanceType = 'CROSS_MARGIN_HOLDING'
  //   balanceEntity.contract = contract._address
  //   balanceEntity.save()
  // } else if (contractName === 'Lending') {

  // }



  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  // let entity = BalanceAmountChange.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  // if (entity == null) {
  //   entity = new BalanceAmountChange(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    // entity.count = BigInt.fromI32(0)
  // }

  // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  // entity.topic = event.params.topic
  // entity.claimant = event.params.claimant

  // Entities can be written to the store with `.save()`
  // entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // None
}

export function handleSubtractFromClaim(event: SubtractFromClaim): void {}
