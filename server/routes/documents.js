import express from 'express'
import DocumentsController from '../controllers/documents.js'

const router = express.Router()

router.get('/:trip_id', DocumentsController.getDocuments)
router.get('/:trip_id', DocumentsController.getTripDocuments)
router.post('/:trip_id', DocumentsController.createDocument)
router.delete('/:id', DocumentsController.deleteDocument)

export default router