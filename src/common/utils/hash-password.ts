import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

export const hashPassword = async function (password: string, salt: string) {
  const scrypt = promisify(_scrypt);
  return (await (scrypt(password, salt, 32) as Promise<Buffer>)).toString(
    'hex',
  );
};
