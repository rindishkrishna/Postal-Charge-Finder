
const express= require('express');
const Router = express.Router();
const asyncvalidator =require('../Middleware/Async');
const { check, validationResult } = require('express-validator');
const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
        return {
            msg: error.msg,
        };
    }
});
/**
 * @swagger
 *
 * /postal:
 *   post:
 *     description: Return the postal charge of item
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: weight
 *         description: Enter the weight of the item in grams.
 *         in: formData
 *         required: true
 *         type: number
 *       - name: sellerPin
 *         description: pincode of seller.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: customerPin
 *         description: pincode of customer.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns the postal charge of item
 */
Router.post('/',
    [check('weight','weight is Required').exists().isNumeric(),
        check('sellerPin',' seller pincode is invalid').exists().isLength({min:6}).isNumeric(),
        check('customerPin',' customer pincode is invalid').exists().isLength({min:6}).isNumeric(),
    ]
    ,asyncvalidator(async (req,res)=>{
        const errors = myValidationResult(req);
    if(!errors.isEmpty()) return res.status(422).json(errors.array() );
    const weight =req.body.weight;
    const seller =req.body.sellerPin.toString();
    const customer =req.body.customerPin.toString();
    let price=0,cityS=seller[0]+seller[1],zoneS=seller[0];
    let cityC=customer[0]+customer[1],zoneC=customer[0]
    let metro=[56,22,60,41,50];
    if(zoneC==1||zoneC==2){
        zoneC="N"
    }
    if(zoneC==3||zoneC==4){
        zoneC="W"
    }
    if(zoneC==5||zoneC==6){
        zoneC="S"
    }
    if(zoneC==7||zoneC==8){
        zoneC="E"
    }
    if(zoneS==1||zoneS==2){
        zoneS="N"
    }
    if(zoneS==3||zoneS==4){
        zoneS="W"
    }
    if(zoneS==5||zoneS==6){
        zoneS="S"
    }
    if(zoneS==7||zoneS==8){
        zoneS="E"
    }

        if (weight <= 500) {

        for(let i=0;i<metro.length;i++){
                if(metro[i]==cityC && metro[i]==cityS){
                        price=48;
                }
        }
        if(cityC===cityS){
            price = 30;
        }
        else if(zoneC===zoneS){
            price = 38;
        }
        else{
            price = 68;
        }

    }
    else if (weight > 500 && weight <= 5000) {
            for(let i=0;i<metro.length;i++){
                if(metro[i]==cityC && metro[i]==cityS){
                    price=46;
                }
            }
            if(cityC===cityS){
                price = 28;
            }
            else if(zoneC===zoneS){
                price = 37;
            }
            else{
                price = 65;
            }
    }
    else{
            for(let i=0;i<metro.length;i++){
                if(metro[i]==cityC && metro[i]==cityS){
                    price=78;
                }
            }
            if(cityC===cityS){
                price = 48;
            }
            else if(zoneC===zoneS){
                price = 62;
            }
            else{
                price = 115;
            }
    }
    const tax=price*.18;
    const fuel=price*.50;
    const state=price*.05;
    const total =price+tax+fuel+state;
    res.send({
        DeliveryCharge:price.toString(),
        Tax:tax.toString(),
        Fuel:fuel.toString(),
        StateEntryFees:state.toString(),
        TotalCharge:total.toString()
    });
}));
module.exports=Router;
