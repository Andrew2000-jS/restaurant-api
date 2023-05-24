import express, { Router } from 'express'
import { deleteReserveCtr, reserveCtr, updateReserveCtr } from '../controllers'
import { verifyToken } from '../../../../shared'

const router: Router = express.Router()

router.post('/reservation/reserve', verifyToken, reserveCtr)
router.put('/reservation/reserve/:id', verifyToken, updateReserveCtr)
router.delete('/reservation/reserve/:id', verifyToken, deleteReserveCtr)

export default router
