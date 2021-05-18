import {
  AccountUpdated
} from "../../generated/CrossMarginTrading/CrossMarginTrading"

export function handleAccountUpdated(event: AccountUpdated): void {
  // this event doesn't actually exist, but I think we need a handler to make subgraph happy
  // because we had to add the event in the subgraph.yaml
}
