import express from 'express';
import db from './models/index';
import router from './routes/routes';
import { json, urlencoded } from 'body-parser';
import './auth/passport'; 
import cors from 'cors';
import { products } from './seeders/products';

const app = express();

<<<<<<< HEAD
app.use (json())
=======
// products.forEach((p)=>{
//     //console.log(p);
//     db.product.create(p);
// })


>>>>>>> 9ceb11fcb5243e55844cb0284e6bccbbcfb26d74

app.use(json());
app.use(urlencoded({
    extended:true
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200'
}))

app.use((
    err:Error,
    req:express.Request,
    res:express.Response, 
    next:express.NextFunction,
)=>{
    res.status(500).json({
        message:err.message
    })
})

app.use('/api', router); 
db.sequelize.sync().then(()=>{
    app.listen(3000, ()=>{
        console.log("Se conecto correctamente");
        
    })
}).catch((e:Error)=>{
    console.log(e.message);
    
})

