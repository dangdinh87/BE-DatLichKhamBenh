import jwt from 'jsonwebtoken'
import createError from 'http-errors'

const signAccessToken = async (accountId) => {
  return new Promise(function (resolve, reject) {
    const payload = {
      accountId,
    }
    const secret = process.env.ACCESS_TOKEN_SECRET;
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
    return next(createError.Unauthorized()) // token ko tồn tại 
  }
  const authHeader = req.headers['authorization']
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1]
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      if (err.name === 'JsonWebTokenError') {
        return next(createError.Unauthorized())
      }
      return next(createError.Unauthorized(err.message)) // Token hết hạn
    }
    req.payload = payload;
    next()
  })
}


module.exports = {
  signAccessToken,
  verifyAccessToken
}

/** 
JsonWebTokenError
  Error object:
    - name: 'JsonWebTokenError'
    - message:
      'jwt malformed'
      'jwt signature is required'
      'invalid signature'
      'jwt audience invalid. expected: [OPTIONS AUDIENCE]'
      'jwt issuer invalid. expected: [OPTIONS ISSUER]'
      'jwt id invalid. expected: [OPTIONS JWT ID]'
      'jwt subject invalid. expected: [OPTIONS SUBJECT]'
*/