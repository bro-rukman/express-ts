import bcrypt from 'bcrypt';
export function hash(password: string) {
  return bcrypt.hash(password, 10);
}
