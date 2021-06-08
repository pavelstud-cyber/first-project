const JwtStrategy=require('passport-jwt').Strategy
const ExtractJwt=require('passport-jwt').ExtractJwt
const user = require("../models").user;


const option={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'niki'
}
module.exports = passport =>{
    passport.use(
        new JwtStrategy(option,async (payload,done)=>{
            try{
                const condidate= await user.findByPk(payload.user_id)
                
            if(condidate){
               
                done(null,condidate)
            }else{
                done(null,false)
            }
            }catch(e){
                console.log(e);
            }
            
        })
    )
}