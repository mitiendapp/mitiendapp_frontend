import express from 'express';
import db from './models/index';
import router from './routes/routes';
const app = express();
import { json } from 'body-parser';

app.use (json())



app.use('/api', router)
db.sequelize.sync().then(()=>{
    app.listen(3000, ()=>{
        console.log("Se conecto correctamente");
        
    })
}).catch((e:Error)=>{
    console.log(e.message);
    
})

