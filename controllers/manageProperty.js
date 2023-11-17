const express = require("express");
const Property = require('../models/property.model.js')
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { ValidatorsImpl } = require("express-validator/src/chain");
const res = require("express/lib/response");
const fetchuser = require("../middleware/Fetchuser.js");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

router.post(
  "/add",
  fetchuser,
  [],
 
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }
    try { 
     
     
     const {name,price,location,type} = req.body ;
     //const loginId = req.user.email;
     const userId = req.user.id;
     console.log(userId)

      let newProperty = await Property.create({
        userId,
        name,
        price,
        location,
        type
      });
      res.json({success:true , newProperty: newProperty});
    
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!!!");
    }
  }
);


router.put(
  "/update/:id",
  fetchuser,
  [],
 
  async (req, res) => {
    // let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }
    try { 
     
     const propertyId = req.params.id;
    //  console.log(propertyId)
     const userId = req.user.id;
    
     const property = await Property.findOne({_id : propertyId, userdId : userId});
     console.log(property)
    //  console.log(propertyId);

     const flag = await Property.findByIdAndUpdate(propertyId , {
      _id: new ObjectId(propertyId), 
      userId: req.user.id,
      name : property.name,
      price: req.body.price, 
      location : property.location ,
      type:req.body.type,
      __v : 0
     } , { new: true})
     
     if(!flag){
        msg = " No Such Property available"
        res.status(500).json({msg})
        return 
     }
     res.json({success:true , flag,  msg : "Property updated successfully"});
    // res.json({success:true})
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!!!");
    }
  }
);

router.delete(
  "/delete/:id",
  fetchuser,
  [],
 
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }
    try { 
     
     
     const propertyId = req.params.id;
     console.log(propertyId)
     const userId= req.user.id
    //  console.log("hello") 
    //  const property = await Property.findOne({_id : propertyId , userdId : userId});
     const property =  await Property.findByIdAndDelete({_id : propertyId});
     if(!property){
        msg = " No Such Property available"
        res.status(500).json({msg})
        return 
     }
     

     res.json({success:true , msg : "Property deleted successfully" });
  
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!!!");
    }
  }
);



module.exports = router;