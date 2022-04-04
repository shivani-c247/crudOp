const { body } = require('express-validator')
const Category = require("../models/Category");

exports.validate = (method) => {
  switch (method) {
    case 'insertCategory': {
     return [ 
      body("categoryName").not().isEmpty().withMessage(" categoryName is required.."),
      body("subCategories").not().isEmpty().withMessage("subCategories is required"),
      body("price").not().isEmpty().withMessage("price is required"),
    
       ]   
    }
  }
}


exports.updateValidate = (method) => {
  switch (method) {
    case 'update': {
     return [ 
      body("categoryName").not().isEmpty().withMessage(" categoryName is required.."),
      body("subCategories").not().isEmpty().withMessage("subCategories is required"),
      body("price").not().isEmpty().withMessage("price is required"),
    
       ]   
    }
  }
}

exports.Productvalidate = (method) => {
  switch (method) {
    case 'insertProduct': {
     return [ 
     body("title").not().isEmpty().withMessage(" title is required.."),
      body("desc").not().isEmpty().withMessage("description is required"),
      body("size").not().isEmpty().withMessage("size is required"),
      body("color").not().isEmpty().withMessage("color is required"),
      

       ]   
    }
  }
}

