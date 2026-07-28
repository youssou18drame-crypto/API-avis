const sendEmail = require('../lib/nodemailer')
const argon2 = require('../lib/argon2')
const prisma = require('../lib/prisma')

module.exports = async (req, res) => {
  console.log("DONNÉES REÇUES DU FRONTEND :", req.body)

  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({
      error: true,
      message: 'Tous les champs sont obligatoires'
    })
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (existingUser) {
      return res.status(409).json({
        error: true,
        message: 'Cet email est déjà utilisé'
      })
    }

    const hash = await argon2.hashPassword(password)

    // On enregistre uniquement les champs qui existent dans ton schema.prisma
    await prisma.user.create({
      data: {
        email,
        passwordHash: hash
      }
    })

    return res.status(201).json({
      error: false,
      message: 'Utilisateur créé avec succès'
    })

  } catch (error) {
    console.error("ERREUR DÉTAILLÉE INSCRIPTION :", error)

    return res.status(500).json({
      error: true,
      message: error.message || 'Erreur serveur'
    })
  }
}