const Parameter = require('parameter')
const jwt = require('jwt-simple')
const moment = require('moment')

const parameter = new Parameter()

exports.parameterValidate = (rule) => {
  return (req, res, next) => {
    const validateErrors = parameter.validate(rule, Object.assign({}, req.body))

    if (validateErrors) {
      return res.status(422).json({
        error: 'Validation Failed',
        detail: validateErrors
      })
    }

    next()
  }
}

exports.check_api_token = (req, res, next) => {
  const token = req.get('x-access-token')
  if (!token) {
    return res.status(401).json({
      error: 'Erreur：Pad des informations X-Access-Token '
    })
  }


  try {
    const decodedToken = jwt.decode(token, 'itcast')


    if (decodedToken.exp < moment().valueOf()) {
      return res.status(401).json({
        error: 'erreur: token a expire'
      })
    }

    req.body.userId = decodedToken.iss

    next()
  } catch (err) {
    res.status(401).json({
      error: 'erreur: invalid token'
    })
  }
}
