import * as argon from 'argon2';

class CheckToken {
  public static HeaderCheck = async (req) => {
    try {
      console.log('MYHEADERS', req.authorization);
      const cekHeader = req?.authorization?.split(' ')[1];
      console.log('MYHEADERSTokens', cekHeader);
      const decoded = argon.verify(
        cekHeader,
        process.env.PRIVATE_KEY || 'ILOVEU3000',
      );

      if (!decoded) {
        return false;
      } else {
        return true;
      }
    } catch (err: any) {
      return false;
    }
  };
}
module.exports = CheckToken;
