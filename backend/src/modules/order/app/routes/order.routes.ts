import express, { Router } from 'express'
import { createOrderCtr, updateOrderCtr, deleterOrderCtr, orderFinderCtr } from '../controllers'

const router: Router = express()

router.get('/orders', orderFinderCtr)
router.post('/order/new', createOrderCtr)
router.put('/order/:id', updateOrderCtr)
router.delete('/order/:id', deleterOrderCtr)

export default router
