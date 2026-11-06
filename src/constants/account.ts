export const accStatus = ["active", "inactive", "frozen"] as const;

export const requestTypes = ["deposit", "withdraw", "transfer"] as const;
export const requestStatus = ["pending", "approved", "rejected"] as const;

export const paymentMethods = [
  "bkash",
  "nagad",
  "rocket",
  "bank",
  "card",
  "cash",
] as const;
