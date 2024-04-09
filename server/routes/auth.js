const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
	res.json({name:'router is working fine'})
});

router.post('/login',(req,res)=>{
	const {username,password} = req.body;
	console.log(username+' and '+password);
});



module.exports = router;