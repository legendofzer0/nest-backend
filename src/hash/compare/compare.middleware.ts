import * as bcrypt from 'bcrypt';

export async function ComparePassword(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
