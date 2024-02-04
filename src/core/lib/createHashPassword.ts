import bcrypt from 'bcryptjs';

export async function createHashPassword(password: string) {
  const salt = await bcrypt.genSalt(5);

  async function hash() {
    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
  }

  async function compare(targetPassword: string) {
    const comparePassword = await bcrypt.compare(password, targetPassword);

    return comparePassword;
  }

  return {
    hash,
    compare,
  };
}
