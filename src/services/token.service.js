import jwt from 'jsonwebtoken'

const signAccessToken = async (accountId) => {
  return new Promise(function (resolve, reject) {
    const payload = {
      accountId,
    }
    const secret = process.env.ACCESS_TOKEN_SECRET;
    console.log(secret);
    const options = {
      expiresIn: '1h'
    }
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}


const verifyAccessToken = (req, res, next) => {
  if (!req.headers['authorization']) {
    return next(createError.Unauthorized())
  }
  const authHeader = req.headers['authorization']
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1]
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) throw err;
    req.payload = payload;
    next()
  })
}


module.exports = {
  signAccessToken,
  verifyAccessToken
}