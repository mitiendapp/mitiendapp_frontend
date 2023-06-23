import express from 'express';
import db from './models/index';
const app = express();


db.sequelize.sync().then(()=>{
    app.listen(3000, ()=>{
        console.log("Se conecto correctamente");
        
    })
}).catch((e:Error)=>{
    console.log(e.message);
    
})

