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
    console.log('pwMatches', pwMatches);
    return pwMatches;
  };

  public static generateToken = (
    id: number,
    name: string,
    password: string,
  ): string => {
    console.log('tokensss111', id, name, password);
    const private_key: string = process.env.PRIVATE_KEY || 'ILOVEU3000';
    console.log('private_key', private_key);
    const token: string = jwt.sign({ id, name, password }, private_key);
    console.log('tokensss', token);
    return token;
  };
}

export default Auth;
