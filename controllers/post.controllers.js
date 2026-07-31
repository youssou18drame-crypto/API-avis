const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Récupérer tous les avis
const getAvis = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany()
    res.json(reviews)
  } catch (error) {
    console.error("Erreur lors de la récupération :", error)
    res.status(500).json({ error: error.message })
  }
}


// Ajouter un avis
const addAvis = async (req, res) => {
  try {
    const { title, name, rating, description, date } = req.body

    const newReview = await prisma.review.create({
      data: {
        name: name || title || "Anonyme",
        date: date ? new Date(date) : new Date(),
        rating: Number(rating) || 5,
        description: description,
        authorized: true
      },
    })

    res.status(201).json({
      success: true,
      review: newReview
    })

  } catch (error) {
    console.error("Erreur lors de l'ajout :", error)
    res.status(500).json({ error: error.message })
  }
}


// Modifier un avis
const updateAvis = async (req, res) => {
  try {
    const { id } = req.params
    const { description, rating } = req.body

    const updatedReview = await prisma.review.update({
      where: {
        id: Number(id)
      },
      data: {
        description,
        rating: rating ? Number(rating) : undefined
      }
    })

    res.json({
      success: true,
      review: updatedReview
    })

  } catch (error) {
    console.error("Erreur lors de la modification :", error)
    res.status(500).json({ error: error.message })
  }
}


// Supprimer un avis
const deleteAvis = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.review.delete({
      where: {
        id: Number(id)
      }
    })

    res.json({
      success: true,
      message: "Avis supprimé avec succès"
    })

  } catch (error) {
    console.error("Erreur lors de la suppression :", error)
    res.status(500).json({ error: error.message })
  }
}


module.exports = {
  getAvis,
  addAvis,
  updateAvis,
  deleteAvis
}