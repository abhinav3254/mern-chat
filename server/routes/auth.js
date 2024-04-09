const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
	res.json({name:'router is working fine'})
});


/**
 * This method is for login of user
 */
router.post('/login',(req,res)=>{
	const {email,password} = req.body;
	res.json(req.body);
});



module.exports = router;