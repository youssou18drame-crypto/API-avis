const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Format "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "401 - Non connecté (Jeton manquant)" })
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secret_par_defaut', (err, user) => {
    if (err) {
      return res.status(403).json({ error: "403 - Non habilité (Jeton invalide)" })
    }
    req.user = user
    next()
  })
}

module.exports = verifyToken