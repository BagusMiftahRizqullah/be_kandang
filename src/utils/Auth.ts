import * as argon from 'argon2';
const jwt = require('jsonwebtoken');
require('dotenv');

class Auth {
  public static hash = (password: string): Promise<string> => {
    return argon.hash(password);
  };

  public static ComparePws = async (
    text: string,
    ciphertext: string,
  ): Promise<boolean> => {
    const pwMatches = await argon.verify(ciphertext, text);
    return pwMatches;
  };

  public static generateToken = (
    id: number,
    name: string,
    password: string,
  ): string => {
    const private_key: string = process.env.PRIVATE_KEY;
    const token: string = jwt.sign({ id, name, password }, private_key);
    return token;
  };
}

export default Auth;
