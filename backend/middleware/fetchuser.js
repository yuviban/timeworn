const jwt = require('jsonwebtoken');
 const JWT_SECRET = "shibdogeaxssandbtcethmanaenj";

const fetchuser= (req,res,next)=>{
    const token = req.header("auth-token")
    if(!token){
        res.status(401).send({error:"Acces denied"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
        
    } catch (error) {
        res.status(401).send({error:"Acces denied"})
        
    }
    

    
}

module.exports = fetchuser;