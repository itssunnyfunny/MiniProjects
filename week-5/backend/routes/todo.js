const {Router} = require('express');
const {Todo} = require('../db');


const router = Router();


router.post('/',async (req, res) => {
    const payload = req.body;
    
});

router.get('/',async (req, res) => {
    
})


router.put('/:id',async (req, res) => {
    
})

module.exports = router