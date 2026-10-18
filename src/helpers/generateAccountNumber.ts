import AccountModel from "@/models/Account";
import { randomInt } from "crypto";

export const generateUniqueAccountNumber = async (): Promise<string> => {
  let accNumber = "";
  let exist = true;

  while (exist) {
    accNumber = Array.from({ length: 10 }, () => randomInt(0, 10)).join("");

    const existingAccount = await AccountModel.findOne({ accNumber });

    if (!existingAccount) {
      exist = false;
    }
  }

  return accNumber;
};