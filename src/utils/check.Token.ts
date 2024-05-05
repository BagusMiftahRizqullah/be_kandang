const jwt = require('jsonwebtoken');

class CheckToken {
  public static HeaderCheck = async (req) => {
    try {
      const cekHeader = req?.authorization?.split(' ')[1];

      const decoded = jwt.verify(cekHeader, process.env.PRIVATE_KEY);

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
