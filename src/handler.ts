import { BigInt, log, Address } from "@graphprotocol/graph-ts";
import { ERC20, Transfer } from "../generated/Dot/ERC20";
import { User } from "../generated/schema";

export function handleTransfer(event: Transfer): void {
  const contract = ERC20.bind(event.address);

  const from = event.params.from;
  const to = event.params.to;
  const value = event.params.value;

  let user1 = User.load(from.toHexString());
  if (user1 == null) {
    user1 = new User(from.toHexString());
  }
  user1.balance = contract.balanceOf(from);

  let user2 = User.load(to.toHexString());
  if (user2 == null) {
    user2 = new User(to.toHexString());
  }
  user2.balance = contract.balanceOf(to);

  user1.save();
  user2.save();
}
