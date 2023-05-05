import express, { Router } from 'express'
import { deleteCtr, loginCtr, signupCtr, updateCtr } from '../controllers'
import { verifyToken } from '../../../../shared'

const router: Router = express.Router()

router.post('/signup', signupCtr)
router.post('/login', loginCtr)

router.put('/update/:id', verifyToken, updateCtr)
router.delete('/delete/:id', verifyToken, deleteCtr)

export default router
