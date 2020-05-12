
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
        check("array.*.sellerPin","seller pincode is invalid").not().isEmpty().isLength({min:6,max:6}),
        check("array.*.customerPin","customer pincode is invalid").not().isEmpty().isLength({min:6,max:6}),
        check("array.*.name","name is required").not().isEmpty(),
    ],
    asyncvalidator(async (req,res)=>{
        const errors = myValidationResult(req);
    if(!errors.isEmpty()) return res.status(422).json(errors.array() );
    let sum=0;
    let arrays=[];
    let metro = [56, 22, 60, 41, 50];
    for(let i=0;i<req.body.array.length;i++)
        {
            const weight = req.body.array[i].weight;
            const name = req.body.array[i].name;
            const seller = req.body.array[i].sellerPin.toString();
            const customer = req.body.array[i].customerPin.toString();
            let price = 0, cityS = seller[0] + seller[1], zoneS = seller[0];
            let cityC = customer[0] + customer[1], zoneC = customer[0];


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

                let f1=0 ,f2=0;
                const n=metro.length;
                if(!price){
                    for (let j = 0; j <n; j++) {

                        if (metro[j] == cityC) {
                            f1=1;

                        }
                        if (metro[j] == cityS) {
                            f2=1;

                        }
                        if (f1===1 && f2===1) {
                            price=48;
                        }


                    }

                }
                if (cityC === cityS && !price) {
                    price = 30;
                } else if (zoneC === zoneS && !price) {
                    price = 38;
                } else if(!price) {
                    price = 68;
                }

            } else if (weight > 500 && weight <= 5000) {
                let f1=0 ,f2=0;
                const n=metro.length;
                if(!price){
                    for (let j = 0; j <n; j++) {

                        if (metro[j] == cityC) {
                            f1=1;

                        }
                        if (metro[j] == cityS) {
                            f2=1;

                        }
                        if (f1===1 && f2===1) {
                            price=46;
                        }


                    }

                }
                if (cityC === cityS && !price) {
                    price = 28;
                } else if (zoneC === zoneS && !price) {
                    price = 37;
                } else if(!price) {
                    price = 65;
                }
            } else {
                let f1=0 ,f2=0;
                const n=metro.length;
                if(!price){
                for (let j = 0; j <n; j++) {
                     if (metro[j] == cityC) {
                         f1=1;

                     }
                     if (metro[j] == cityS) {
                          f2=1;

                     }
                     if (f1===1 && f2===1) {
                         price=78;
                     }
                }

                }
                if (cityC === cityS && !price) {
                    price = 48;
                } else if (zoneC === zoneS && !price) {
                    price = 62;
                } else if(!price) {
                    price = 115;
                }
            }
            const tax = price * .18;
            const fuel = price * .50;
            const state = price * .05;
            const total = price + tax + fuel + state;
            sum=sum+total;
            arrays.push({
                name:name,
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
