import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
require('dotenv').config();
class Authentication {
  public static passwordHash = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  };
  public static passwordCompare = async (text: string, encryptedText: string): Promise<boolean> => {
    let result = await bcrypt.compare(text, encryptedText);
    return result;
  };
  public static generateToken = (id: number, username: string, password: string): string => {
    const secretKey: string = process.env.JWT_SECRET_KEY || 'secret_key';
    const token: string = jwt.sign({ id, username, password }, secretKey);
    return token;
  };
  public static generateTokenAndRefresh = (id: number, username: string, region: string): any => {
    const accessSecretKey: string = process.env.ACCESS_SECRET_KEY || 'keys_secrets_access';
    const refreshSecretKey: string = process.env.REFRESH_SECRET_KEY || 'keys_secrets_refresh';
    const accessToken: string = jwt.sign({ id, username, region }, accessSecretKey, { expiresIn: '60m' });
    const refreshToken: string = jwt.sign({ id, username, region }, refreshSecretKey, { expiresIn: '5m' });
    return { accessToken, refreshToken };
  };
}
export default Authentication;
