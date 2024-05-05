import * as argon from 'argon2';
const jwt = require('jsonwebtoken');

class CheckToken {
  public static HeaderCheck = async (req) => {
    try {
      const cekHeader = req?.authorization?.split(' ')[1];

      const decoded = jwt.verify(
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
