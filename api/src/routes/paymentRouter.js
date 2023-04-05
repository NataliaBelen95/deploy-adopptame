const paymentRouter = require("express").Router();
const cors = require("cors");
const { trusted } = require("mongoose");
const Stripe = require ('stripe');

const stripe = new Stripe('sk_test_51Ms60fDepZWv3l5I494lapscRdvRX3ISklg2ALxdNflsIYpWeT0vNoHsW0U3HUsYkmB5e4D5M0HhELz7lX6A17x600PFpHbsf5')

paymentRouter.use(cors({origin:'http://localhost:3000'}))
paymentRouter.post('/', async (req, res)=>{
    try {
        // console.log(req.body)
        // res.status(200).json('Datos de Pago Recibidos por el Back')
        const {id, amount, description} = req.body
        console.log(req.body, "este es el req.body")
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'USD',
            description: `Donacion a ${description}`,
            payment_method: id,
            confirm: trusted
        })
        //console.log(payment)
        res.status(200).json('Pago registrado!')
        
    } catch (error) {
       console.log(error)
        res.status(400).json({message: error.raw.message});
        
    }
})




module.exports = paymentRouter;