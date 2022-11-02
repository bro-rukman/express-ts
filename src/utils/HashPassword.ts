import bcrypt from 'bcrypt';

class HashPassword {
  public static hash = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  };
}
export default HashPassword;
