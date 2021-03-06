// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AddToClaim extends ethereum.Event {
  get params(): AddToClaim__Params {
    return new AddToClaim__Params(this);
  }
}

export class AddToClaim__Params {
  _event: AddToClaim;

  constructor(event: AddToClaim) {
    this._event = event;
  }

  get topic(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get claimant(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class SubtractFromClaim extends ethereum.Event {
  get params(): SubtractFromClaim__Params {
    return new SubtractFromClaim__Params(this);
  }
}

export class SubtractFromClaim__Params {
  _event: SubtractFromClaim;

  constructor(event: SubtractFromClaim) {
    this._event = event;
  }

  get topic(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get claimant(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Lending__applyBorrowInterestResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class Lending__borrowYieldAccumulatorsResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }
}

export class Lending__hourlyBondAccountsResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }
}

export class Lending__lendingMetaResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }
}

export class Lending extends ethereum.SmartContract {
  static bind(address: Address): Lending {
    return new Lending("Lending", address);
  }

  activeIssuers(param0: Address): boolean {
    let result = super.call("activeIssuers", "activeIssuers(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBoolean();
  }

  try_activeIssuers(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "activeIssuers",
      "activeIssuers(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  applyBorrowInterest(
    balance: BigInt,
    issuer: Address,
    yieldQuotientFP: BigInt
  ): Lending__applyBorrowInterestResult {
    let result = super.call(
      "applyBorrowInterest",
      "applyBorrowInterest(uint256,address,uint256):(uint256,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(balance),
        ethereum.Value.fromAddress(issuer),
        ethereum.Value.fromUnsignedBigInt(yieldQuotientFP)
      ]
    );

    return new Lending__applyBorrowInterestResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_applyBorrowInterest(
    balance: BigInt,
    issuer: Address,
    yieldQuotientFP: BigInt
  ): ethereum.CallResult<Lending__applyBorrowInterestResult> {
    let result = super.tryCall(
      "applyBorrowInterest",
      "applyBorrowInterest(uint256,address,uint256):(uint256,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(balance),
        ethereum.Value.fromAddress(issuer),
        ethereum.Value.fromUnsignedBigInt(yieldQuotientFP)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Lending__applyBorrowInterestResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  borrowYieldAccumulators(
    param0: Address
  ): Lending__borrowYieldAccumulatorsResult {
    let result = super.call(
      "borrowYieldAccumulators",
      "borrowYieldAccumulators(address):(uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return new Lending__borrowYieldAccumulatorsResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt()
    );
  }

  try_borrowYieldAccumulators(
    param0: Address
  ): ethereum.CallResult<Lending__borrowYieldAccumulatorsResult> {
    let result = super.tryCall(
      "borrowYieldAccumulators",
      "borrowYieldAccumulators(address):(uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Lending__borrowYieldAccumulatorsResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt()
      )
    );
  }

  borrowingFactorPercent(): BigInt {
    let result = super.call(
      "borrowingFactorPercent",
      "borrowingFactorPercent():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_borrowingFactorPercent(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "borrowingFactorPercent",
      "borrowingFactorPercent():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getUpdatedBorrowYieldAccuFP(issuer: Address): BigInt {
    let result = super.call(
      "getUpdatedBorrowYieldAccuFP",
      "getUpdatedBorrowYieldAccuFP(address):(uint256)",
      [ethereum.Value.fromAddress(issuer)]
    );

    return result[0].toBigInt();
  }

  try_getUpdatedBorrowYieldAccuFP(
    issuer: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getUpdatedBorrowYieldAccuFP",
      "getUpdatedBorrowYieldAccuFP(address):(uint256)",
      [ethereum.Value.fromAddress(issuer)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  haircuts(param0: Address): BigInt {
    let result = super.call("haircuts", "haircuts(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBigInt();
  }

  try_haircuts(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("haircuts", "haircuts(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  highRatePerPercent(): BigInt {
    let result = super.call(
      "highRatePerPercent",
      "highRatePerPercent():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_highRatePerPercent(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "highRatePerPercent",
      "highRatePerPercent():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  hourlyBondAccounts(
    param0: Address,
    param1: Address
  ): Lending__hourlyBondAccountsResult {
    let result = super.call(
      "hourlyBondAccounts",
      "hourlyBondAccounts(address,address):(uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );

    return new Lending__hourlyBondAccountsResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt()
    );
  }

  try_hourlyBondAccounts(
    param0: Address,
    param1: Address
  ): ethereum.CallResult<Lending__hourlyBondAccountsResult> {
    let result = super.tryCall(
      "hourlyBondAccounts",
      "hourlyBondAccounts(address,address):(uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Lending__hourlyBondAccountsResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt()
      )
    );
  }

  issuerTokens(param0: Address): Address {
    let result = super.call("issuerTokens", "issuerTokens(address):(address)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toAddress();
  }

  try_issuerTokens(param0: Address): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "issuerTokens",
      "issuerTokens(address):(address)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  lendingMeta(param0: Address): Lending__lendingMetaResult {
    let result = super.call(
      "lendingMeta",
      "lendingMeta(address):(uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return new Lending__lendingMetaResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt()
    );
  }

  try_lendingMeta(
    param0: Address
  ): ethereum.CallResult<Lending__lendingMetaResult> {
    let result = super.tryCall(
      "lendingMeta",
      "lendingMeta(address):(uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Lending__lendingMetaResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt()
      )
    );
  }

  mainCharacterCache(param0: BigInt): Address {
    let result = super.call(
      "mainCharacterCache",
      "mainCharacterCache(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return result[0].toAddress();
  }

  try_mainCharacterCache(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "mainCharacterCache",
      "mainCharacterCache(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  normalRatePerPercent(): BigInt {
    let result = super.call(
      "normalRatePerPercent",
      "normalRatePerPercent():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_normalRatePerPercent(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "normalRatePerPercent",
      "normalRatePerPercent():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  roleCache(param0: Address, param1: BigInt): boolean {
    let result = super.call("roleCache", "roleCache(address,uint256):(bool)", [
      ethereum.Value.fromAddress(param0),
      ethereum.Value.fromUnsignedBigInt(param1)
    ]);

    return result[0].toBoolean();
  }

  try_roleCache(param0: Address, param1: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "roleCache",
      "roleCache(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  roles(): Address {
    let result = super.call("roles", "roles():(address)", []);

    return result[0].toAddress();
  }

  try_roles(): ethereum.CallResult<Address> {
    let result = super.tryCall("roles", "roles():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  updateHourlyYield(issuer: Address): BigInt {
    let result = super.call(
      "updateHourlyYield",
      "updateHourlyYield(address):(uint256)",
      [ethereum.Value.fromAddress(issuer)]
    );

    return result[0].toBigInt();
  }

  try_updateHourlyYield(issuer: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "updateHourlyYield",
      "updateHourlyYield(address):(uint256)",
      [ethereum.Value.fromAddress(issuer)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  viewAccumulatedBorrowingYieldFP(issuer: Address): BigInt {
    let result = super.call(
      "viewAccumulatedBorrowingYieldFP",
      "viewAccumulatedBorrowingYieldFP(address):(uint256)",
      [ethereum.Value.fromAddress(issuer)]
    );

    return result[0].toBigInt();
  }

  try_viewAccumulatedBorrowingYieldFP(
    issuer: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "viewAccumulatedBorrowingYieldFP",
      "viewAccumulatedBorrowingYieldFP(address):(uint256)",
      [ethereum.Value.fromAddress(issuer)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  viewBorrowAPRPer10k(issuer: Address): BigInt {
    let result = super.call(
      "viewBorrowAPRPer10k",
      "viewBorrowAPRPer10k(address):(uint256)",
      [ethereum.Value.fromAddress(issuer)]
    );

    return result[0].toBigInt();
  }

  try_viewBorrowAPRPer10k(issuer: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "viewBorrowAPRPer10k",
      "viewBorrowAPRPer10k(address):(uint256)",
      [ethereum.Value.fromAddress(issuer)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  viewHourlyBondAPRPer10k(issuer: Address): BigInt {
    let result = super.call(
      "viewHourlyBondAPRPer10k",
      "viewHourlyBondAPRPer10k(address):(uint256)",
      [ethereum.Value.fromAddress(issuer)]
    );

    return result[0].toBigInt();
  }

  try_viewHourlyBondAPRPer10k(issuer: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "viewHourlyBondAPRPer10k",
      "viewHourlyBondAPRPer10k(address):(uint256)",
      [ethereum.Value.fromAddress(issuer)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  viewHourlyBondAmount(issuer: Address, holder: Address): BigInt {
    let result = super.call(
      "viewHourlyBondAmount",
      "viewHourlyBondAmount(address,address):(uint256)",
      [ethereum.Value.fromAddress(issuer), ethereum.Value.fromAddress(holder)]
    );

    return result[0].toBigInt();
  }

  try_viewHourlyBondAmount(
    issuer: Address,
    holder: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "viewHourlyBondAmount",
      "viewHourlyBondAmount(address,address):(uint256)",
      [ethereum.Value.fromAddress(issuer), ethereum.Value.fromAddress(holder)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  viewWithBorrowInterest(
    balance: BigInt,
    issuer: Address,
    yieldQuotientFP: BigInt
  ): BigInt {
    let result = super.call(
      "viewWithBorrowInterest",
      "viewWithBorrowInterest(uint256,address,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(balance),
        ethereum.Value.fromAddress(issuer),
        ethereum.Value.fromUnsignedBigInt(yieldQuotientFP)
      ]
    );

    return result[0].toBigInt();
  }

  try_viewWithBorrowInterest(
    balance: BigInt,
    issuer: Address,
    yieldQuotientFP: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "viewWithBorrowInterest",
      "viewWithBorrowInterest(uint256,address,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(balance),
        ethereum.Value.fromAddress(issuer),
        ethereum.Value.fromUnsignedBigInt(yieldQuotientFP)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  withdrawalWindow(): BigInt {
    let result = super.call(
      "withdrawalWindow",
      "withdrawalWindow():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_withdrawalWindow(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "withdrawalWindow",
      "withdrawalWindow():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _roles(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ActivateIssuerCall extends ethereum.Call {
  get inputs(): ActivateIssuerCall__Inputs {
    return new ActivateIssuerCall__Inputs(this);
  }

  get outputs(): ActivateIssuerCall__Outputs {
    return new ActivateIssuerCall__Outputs(this);
  }
}

export class ActivateIssuerCall__Inputs {
  _call: ActivateIssuerCall;

  constructor(call: ActivateIssuerCall) {
    this._call = call;
  }

  get issuer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ActivateIssuerCall__Outputs {
  _call: ActivateIssuerCall;

  constructor(call: ActivateIssuerCall) {
    this._call = call;
  }
}

export class ActivateIssuer1Call extends ethereum.Call {
  get inputs(): ActivateIssuer1Call__Inputs {
    return new ActivateIssuer1Call__Inputs(this);
  }

  get outputs(): ActivateIssuer1Call__Outputs {
    return new ActivateIssuer1Call__Outputs(this);
  }
}

export class ActivateIssuer1Call__Inputs {
  _call: ActivateIssuer1Call;

  constructor(call: ActivateIssuer1Call) {
    this._call = call;
  }

  get issuer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get token(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ActivateIssuer1Call__Outputs {
  _call: ActivateIssuer1Call;

  constructor(call: ActivateIssuer1Call) {
    this._call = call;
  }
}

export class ApplyBorrowInterestCall extends ethereum.Call {
  get inputs(): ApplyBorrowInterestCall__Inputs {
    return new ApplyBorrowInterestCall__Inputs(this);
  }

  get outputs(): ApplyBorrowInterestCall__Outputs {
    return new ApplyBorrowInterestCall__Outputs(this);
  }
}

export class ApplyBorrowInterestCall__Inputs {
  _call: ApplyBorrowInterestCall;

  constructor(call: ApplyBorrowInterestCall) {
    this._call = call;
  }

  get balance(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get issuer(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get yieldQuotientFP(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class ApplyBorrowInterestCall__Outputs {
  _call: ApplyBorrowInterestCall;

  constructor(call: ApplyBorrowInterestCall) {
    this._call = call;
  }

  get balanceWithInterest(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }

  get accumulatorFP(): BigInt {
    return this._call.outputValues[1].value.toBigInt();
  }
}

export class BuyHourlyBondSubscriptionCall extends ethereum.Call {
  get inputs(): BuyHourlyBondSubscriptionCall__Inputs {
    return new BuyHourlyBondSubscriptionCall__Inputs(this);
  }

  get outputs(): BuyHourlyBondSubscriptionCall__Outputs {
    return new BuyHourlyBondSubscriptionCall__Outputs(this);
  }
}

export class BuyHourlyBondSubscriptionCall__Inputs {
  _call: BuyHourlyBondSubscriptionCall;

  constructor(call: BuyHourlyBondSubscriptionCall) {
    this._call = call;
  }

  get issuer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class BuyHourlyBondSubscriptionCall__Outputs {
  _call: BuyHourlyBondSubscriptionCall;

  constructor(call: BuyHourlyBondSubscriptionCall) {
    this._call = call;
  }
}

export class CloseHourlyBondAccountCall extends ethereum.Call {
  get inputs(): CloseHourlyBondAccountCall__Inputs {
    return new CloseHourlyBondAccountCall__Inputs(this);
  }

  get outputs(): CloseHourlyBondAccountCall__Outputs {
    return new CloseHourlyBondAccountCall__Outputs(this);
  }
}

export class CloseHourlyBondAccountCall__Inputs {
  _call: CloseHourlyBondAccountCall;

  constructor(call: CloseHourlyBondAccountCall) {
    this._call = call;
  }

  get issuer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class CloseHourlyBondAccountCall__Outputs {
  _call: CloseHourlyBondAccountCall;

  constructor(call: CloseHourlyBondAccountCall) {
    this._call = call;
  }
}

export class DeactivateIssuerCall extends ethereum.Call {
  get inputs(): DeactivateIssuerCall__Inputs {
    return new DeactivateIssuerCall__Inputs(this);
  }

  get outputs(): DeactivateIssuerCall__Outputs {
    return new DeactivateIssuerCall__Outputs(this);
  }
}

export class DeactivateIssuerCall__Inputs {
  _call: DeactivateIssuerCall;

  constructor(call: DeactivateIssuerCall) {
    this._call = call;
  }

  get issuer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class DeactivateIssuerCall__Outputs {
  _call: DeactivateIssuerCall;

  constructor(call: DeactivateIssuerCall) {
    this._call = call;
  }
}

export class GetUpdatedBorrowYieldAccuFPCall extends ethereum.Call {
  get inputs(): GetUpdatedBorrowYieldAccuFPCall__Inputs {
    return new GetUpdatedBorrowYieldAccuFPCall__Inputs(this);
  }

  get outputs(): GetUpdatedBorrowYieldAccuFPCall__Outputs {
    return new GetUpdatedBorrowYieldAccuFPCall__Outputs(this);
  }
}

export class GetUpdatedBorrowYieldAccuFPCall__Inputs {
  _call: GetUpdatedBorrowYieldAccuFPCall;

  constructor(call: GetUpdatedBorrowYieldAccuFPCall) {
    this._call = call;
  }

  get issuer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class GetUpdatedBorrowYieldAccuFPCall__Outputs {
  _call: GetUpdatedBorrowYieldAccuFPCall;

  constructor(call: GetUpdatedBorrowYieldAccuFPCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class HaircutCall extends ethereum.Call {
  get inputs(): HaircutCall__Inputs {
    return new HaircutCall__Inputs(this);
  }

  get outputs(): HaircutCall__Outputs {
    return new HaircutCall__Outputs(this);
  }
}

export class HaircutCall__Inputs {
  _call: HaircutCall;

  constructor(call: HaircutCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class HaircutCall__Outputs {
  _call: HaircutCall;

  constructor(call: HaircutCall) {
    this._call = call;
  }
}

export class InitBorrowYieldAccumulatorCall extends ethereum.Call {
  get inputs(): InitBorrowYieldAccumulatorCall__Inputs {
    return new InitBorrowYieldAccumulatorCall__Inputs(this);
  }

  get outputs(): InitBorrowYieldAccumulatorCall__Outputs {
    return new InitBorrowYieldAccumulatorCall__Outputs(this);
  }
}

export class InitBorrowYieldAccumulatorCall__Inputs {
  _call: InitBorrowYieldAccumulatorCall;

  constructor(call: InitBorrowYieldAccumulatorCall) {
    this._call = call;
  }

  get issuer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class InitBorrowYieldAccumulatorCall__Outputs {
  _call: InitBorrowYieldAccumulatorCall;

  constructor(call: InitBorrowYieldAccumulatorCall) {
    this._call = call;
  }
}

export class MakeFallbackBondCall extends ethereum.Call {
  get inputs(): MakeFallbackBondCall__Inputs {
    return new MakeFallbackBondCall__Inputs(this);
  }

  get outputs(): MakeFallbackBondCall__Outputs {
    return new MakeFallbackBondCall__Outputs(this);
  }
}

export class MakeFallbackBondCall__Inputs {
  _call: MakeFallbackBondCall;

  constructor(call: MakeFallbackBondCall) {
    this._call = call;
  }

  get issuer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get holder(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class MakeFallbackBondCall__Outputs {
  _call: MakeFallbackBondCall;

  constructor(call: MakeFallbackBondCall) {
    this._call = call;
  }
}

export class PayOffCall extends ethereum.Call {
  get inputs(): PayOffCall__Inputs {
    return new PayOffCall__Inputs(this);
  }

  get outputs(): PayOffCall__Outputs {
    return new PayOffCall__Outputs(this);
  }
}

export class PayOffCall__Inputs {
  _call: PayOffCall;

  constructor(call: PayOffCall) {
    this._call = call;
  }

  get issuer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class PayOffCall__Outputs {
  _call: PayOffCall;

  constructor(call: PayOffCall) {
    this._call = call;
  }
}

export class RegisterBorrowCall extends ethereum.Call {
  get inputs(): RegisterBorrowCall__Inputs {
    return new RegisterBorrowCall__Inputs(this);
  }

  get outputs(): RegisterBorrowCall__Outputs {
    return new RegisterBorrowCall__Outputs(this);
  }
}

export class RegisterBorrowCall__Inputs {
  _call: RegisterBorrowCall;

  constructor(call: RegisterBorrowCall) {
    this._call = call;
  }

  get issuer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class RegisterBorrowCall__Outputs {
  _call: RegisterBorrowCall;

  constructor(call: RegisterBorrowCall) {
    this._call = call;
  }
}

export class RegisterLendCall extends ethereum.Call {
  get inputs(): RegisterLendCall__Inputs {
    return new RegisterLendCall__Inputs(this);
  }

  get outputs(): RegisterLendCall__Outputs {
    return new RegisterLendCall__Outputs(this);
  }
}

export class RegisterLendCall__Inputs {
  _call: RegisterLendCall;

  constructor(call: RegisterLendCall) {
    this._call = call;
  }

  get issuer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class RegisterLendCall__Outputs {
  _call: RegisterLendCall;

  constructor(call: RegisterLendCall) {
    this._call = call;
  }
}

export class RegisterWithdrawalCall extends ethereum.Call {
  get inputs(): RegisterWithdrawalCall__Inputs {
    return new RegisterWithdrawalCall__Inputs(this);
  }

  get outputs(): RegisterWithdrawalCall__Outputs {
    return new RegisterWithdrawalCall__Outputs(this);
  }
}

export class RegisterWithdrawalCall__Inputs {
  _call: RegisterWithdrawalCall;

  constructor(call: RegisterWithdrawalCall) {
    this._call = call;
  }

  get issuer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class RegisterWithdrawalCall__Outputs {
  _call: RegisterWithdrawalCall;

  constructor(call: RegisterWithdrawalCall) {
    this._call = call;
  }
}

export class SetBorrowingFactorPercentCall extends ethereum.Call {
  get inputs(): SetBorrowingFactorPercentCall__Inputs {
    return new SetBorrowingFactorPercentCall__Inputs(this);
  }

  get outputs(): SetBorrowingFactorPercentCall__Outputs {
    return new SetBorrowingFactorPercentCall__Outputs(this);
  }
}

export class SetBorrowingFactorPercentCall__Inputs {
  _call: SetBorrowingFactorPercentCall;

  constructor(call: SetBorrowingFactorPercentCall) {
    this._call = call;
  }

  get borrowingFactor(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetBorrowingFactorPercentCall__Outputs {
  _call: SetBorrowingFactorPercentCall;

  constructor(call: SetBorrowingFactorPercentCall) {
    this._call = call;
  }
}

export class SetHighRatePerPercentCall extends ethereum.Call {
  get inputs(): SetHighRatePerPercentCall__Inputs {
    return new SetHighRatePerPercentCall__Inputs(this);
  }

  get outputs(): SetHighRatePerPercentCall__Outputs {
    return new SetHighRatePerPercentCall__Outputs(this);
  }
}

export class SetHighRatePerPercentCall__Inputs {
  _call: SetHighRatePerPercentCall;

  constructor(call: SetHighRatePerPercentCall) {
    this._call = call;
  }

  get rate(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetHighRatePerPercentCall__Outputs {
  _call: SetHighRatePerPercentCall;

  constructor(call: SetHighRatePerPercentCall) {
    this._call = call;
  }
}

export class SetHourlyYieldAPRCall extends ethereum.Call {
  get inputs(): SetHourlyYieldAPRCall__Inputs {
    return new SetHourlyYieldAPRCall__Inputs(this);
  }

  get outputs(): SetHourlyYieldAPRCall__Outputs {
    return new SetHourlyYieldAPRCall__Outputs(this);
  }
}

export class SetHourlyYieldAPRCall__Inputs {
  _call: SetHourlyYieldAPRCall;

  constructor(call: SetHourlyYieldAPRCall) {
    this._call = call;
  }

  get issuer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get aprPercent(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetHourlyYieldAPRCall__Outputs {
  _call: SetHourlyYieldAPRCall;

  constructor(call: SetHourlyYieldAPRCall) {
    this._call = call;
  }
}

export class SetLendingCapCall extends ethereum.Call {
  get inputs(): SetLendingCapCall__Inputs {
    return new SetLendingCapCall__Inputs(this);
  }

  get outputs(): SetLendingCapCall__Outputs {
    return new SetLendingCapCall__Outputs(this);
  }
}

export class SetLendingCapCall__Inputs {
  _call: SetLendingCapCall;

  constructor(call: SetLendingCapCall) {
    this._call = call;
  }

  get issuer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get cap(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetLendingCapCall__Outputs {
  _call: SetLendingCapCall;

  constructor(call: SetLendingCapCall) {
    this._call = call;
  }
}

export class SetNormalRatePerPercentCall extends ethereum.Call {
  get inputs(): SetNormalRatePerPercentCall__Inputs {
    return new SetNormalRatePerPercentCall__Inputs(this);
  }

  get outputs(): SetNormalRatePerPercentCall__Outputs {
    return new SetNormalRatePerPercentCall__Outputs(this);
  }
}

export class SetNormalRatePerPercentCall__Inputs {
  _call: SetNormalRatePerPercentCall;

  constructor(call: SetNormalRatePerPercentCall) {
    this._call = call;
  }

  get rate(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetNormalRatePerPercentCall__Outputs {
  _call: SetNormalRatePerPercentCall;

  constructor(call: SetNormalRatePerPercentCall) {
    this._call = call;
  }
}

export class SetWithdrawalWindowCall extends ethereum.Call {
  get inputs(): SetWithdrawalWindowCall__Inputs {
    return new SetWithdrawalWindowCall__Inputs(this);
  }

  get outputs(): SetWithdrawalWindowCall__Outputs {
    return new SetWithdrawalWindowCall__Outputs(this);
  }
}

export class SetWithdrawalWindowCall__Inputs {
  _call: SetWithdrawalWindowCall;

  constructor(call: SetWithdrawalWindowCall) {
    this._call = call;
  }

  get window(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetWithdrawalWindowCall__Outputs {
  _call: SetWithdrawalWindowCall;

  constructor(call: SetWithdrawalWindowCall) {
    this._call = call;
  }
}

export class UpdateHourlyYieldCall extends ethereum.Call {
  get inputs(): UpdateHourlyYieldCall__Inputs {
    return new UpdateHourlyYieldCall__Inputs(this);
  }

  get outputs(): UpdateHourlyYieldCall__Outputs {
    return new UpdateHourlyYieldCall__Outputs(this);
  }
}

export class UpdateHourlyYieldCall__Inputs {
  _call: UpdateHourlyYieldCall;

  constructor(call: UpdateHourlyYieldCall) {
    this._call = call;
  }

  get issuer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdateHourlyYieldCall__Outputs {
  _call: UpdateHourlyYieldCall;

  constructor(call: UpdateHourlyYieldCall) {
    this._call = call;
  }

  get hourlyYield(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class UpdateMainCharacterCacheCall extends ethereum.Call {
  get inputs(): UpdateMainCharacterCacheCall__Inputs {
    return new UpdateMainCharacterCacheCall__Inputs(this);
  }

  get outputs(): UpdateMainCharacterCacheCall__Outputs {
    return new UpdateMainCharacterCacheCall__Outputs(this);
  }
}

export class UpdateMainCharacterCacheCall__Inputs {
  _call: UpdateMainCharacterCacheCall;

  constructor(call: UpdateMainCharacterCacheCall) {
    this._call = call;
  }

  get role(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class UpdateMainCharacterCacheCall__Outputs {
  _call: UpdateMainCharacterCacheCall;

  constructor(call: UpdateMainCharacterCacheCall) {
    this._call = call;
  }
}

export class UpdateRoleCacheCall extends ethereum.Call {
  get inputs(): UpdateRoleCacheCall__Inputs {
    return new UpdateRoleCacheCall__Inputs(this);
  }

  get outputs(): UpdateRoleCacheCall__Outputs {
    return new UpdateRoleCacheCall__Outputs(this);
  }
}

export class UpdateRoleCacheCall__Inputs {
  _call: UpdateRoleCacheCall;

  constructor(call: UpdateRoleCacheCall) {
    this._call = call;
  }

  get role(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get contr(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class UpdateRoleCacheCall__Outputs {
  _call: UpdateRoleCacheCall;

  constructor(call: UpdateRoleCacheCall) {
    this._call = call;
  }
}

export class WithdrawHourlyBondCall extends ethereum.Call {
  get inputs(): WithdrawHourlyBondCall__Inputs {
    return new WithdrawHourlyBondCall__Inputs(this);
  }

  get outputs(): WithdrawHourlyBondCall__Outputs {
    return new WithdrawHourlyBondCall__Outputs(this);
  }
}

export class WithdrawHourlyBondCall__Inputs {
  _call: WithdrawHourlyBondCall;

  constructor(call: WithdrawHourlyBondCall) {
    this._call = call;
  }

  get issuer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class WithdrawHourlyBondCall__Outputs {
  _call: WithdrawHourlyBondCall;

  constructor(call: WithdrawHourlyBondCall) {
    this._call = call;
  }
}
