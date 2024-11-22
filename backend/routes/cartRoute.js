import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js'
import authUser from '../middleware/auth.js'

const cartRouter = express.Router()

//whenever any user get / update / add - the cart
//they must loggedin to access the cart
cartRouter.post('/get', authUser, getUserCart)
cartRouter.post('/add', authUser, addToCart)
cartRouter.post('/update', authUser, updateCart)

export default cartRouter