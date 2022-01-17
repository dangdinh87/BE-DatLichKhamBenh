import db from '../models';
import { verifyAccessToken } from '../services/token.service';

const auth = async (req, res, next) => {
  try {
    const token = await verifyAccessToken(req, res, next);
    if (token) {
      const checkAccount = await db.Account.findOne({
        where: { id: req.payload.accountId },
      });

      if (!checkAccount) {
        return res.status(400).json({
          message: 'Người dùng không tồn tại',
        });
      }

      next();
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};

module.exports = {
  auth,
};
