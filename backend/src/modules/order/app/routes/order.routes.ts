import express, { Router } from 'express'
import { createOrderCtr, updateOrderCtr, deleterOrderCtr } from '../controllers'

const router: Router = express()

router.post('/order/new', createOrderCtr)
router.put('/order/:id', updateOrderCtr)
router.delete('/order/:id', deleterOrderCtr)
