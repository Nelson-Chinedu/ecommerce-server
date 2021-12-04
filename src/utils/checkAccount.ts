import { Account } from '../db';
import { AccountType } from '../db/entity/Account';

export const checkAccount = (account: Account | undefined) => {
  if (!account || (account && account.accountType !== AccountType.MERCHANT)) {
    return 'Permission denied';
  } else if (
    account &&
    account.blocked &&
    account.accountType === AccountType.MERCHANT
  ) {
    return 'Account blocked, kindly contact support';
  }
};
