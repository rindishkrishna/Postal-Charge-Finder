
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
Router.post('/',
    [check("array.*.weight","weight is required").not().isEmpty(),
        check("array.*.sellerPin","seller pincode is required").not().isEmpty(),
        check("array.*.customerPin","customer pincode is required").not().isEmpty(),
    ],
    asyncvalidator(async (req,res)=>{
        const errors = myValidationResult(req);
    if(!errors.isEmpty()) return res.status(422).json(errors.array() );
    let sum=0;
    let arrays=[];
    for(let i=0;i<req.body.array.length;i++)
        {
            const weight = req.body.array[i].weight;
            const seller = req.body.array[i].sellerPin.toString();
            const customer = req.body.array[i].customerPin.toString();
            let price = 0, cityS = seller[0] + seller[1], zoneS = seller[0];
            let cityC = customer[0] + customer[1], zoneC = customer[0];
            let metro = [56, 22, 60, 41, 50];

            if (zoneC == 1 || zoneC == 2) {
                zoneC = "N"
            }
            if (zoneC == 3 || zoneC == 4) {
                zoneC = "W"
            }
            if (zoneC == 5 || zoneC == 6) {
                zoneC = "S"
            }
            if (zoneC == 7 || zoneC == 8) {
                zoneC = "E"
            }
            if (zoneS == 1 || zoneS == 2) {
                zoneS = "N"
            }
            if (zoneS == 3 || zoneS == 4) {
                zoneS = "W"
            }
            if (zoneS == 5 || zoneS == 6) {
                zoneS = "S"
            }
            if (zoneS == 7 || zoneS == 8) {
                zoneS = "E"
            }

            if (weight <= 500) {

                for (let i = 0; i < metro.length; i++) {
                    if (metro[i] == cityC && metro[i] == cityS) {
                        price = 48;
                    }
                }
                if (cityC === cityS) {
                    price = 30;
                } else if (zoneC === zoneS) {
                    price = 38;
                } else {
                    price = 68;
                }

            } else if (weight > 500 && weight <= 5000) {
                for (let i = 0; i < metro.length; i++) {
                    if (metro[i] == cityC && metro[i] == cityS) {
                        price = 46;
                    }
                }
                if (cityC === cityS) {
                    price = 28;
                } else if (zoneC === zoneS) {
                    price = 37;
                } else {
                    price = 65;
                }
            } else {
                for (let i = 0; i < metro.length; i++) {
                    if (metro[i] == cityC && metro[i] == cityS) {
                        price = 78;
                    }
                }
                if (cityC === cityS) {
                    price = 48;
                } else if (zoneC === zoneS) {
                    price = 62;
                } else {
                    price = 115;
                }
            }
            const tax = price * .18;
            const fuel = price * .50;
            const state = price * .05;
            const total = price + tax + fuel + state;
            sum=sum+total;
            arrays.push({
                DeliveryCharge: price.toString(),
                Tax: tax.toString(),
                Fuel: fuel.toString(),
                StateEntryFees: state.toString(),
                TotalCharge: total.toString()
            })
            /*res.send({
                DeliveryCharge: price.toString(),
                Tax: tax.toString(),
                Fuel: fuel.toString(),
                StateEntryFees: state.toString(),
                TotalCharge: total.toString()
            });*/
        }
        arrays.push({GrantTotalCartValue:sum});
        res.send(arrays)
}));
module.exports=Router;
