import express from 'express';
import db from './models/index';
import router from './routes/routes';
import { json, urlencoded } from 'body-parser';
import './auth/passport'; 
import cors from 'cors';
import { products } from './seeders/products';

const app = express();

// products.forEach((p)=>{
//     //console.log(p);
//     db.Product.create(p);
// })

app.use(json());
app.use(urlencoded({
    extended:true
}))

const allowedOrigins = ['http://localhost:4200', ' http://127.0.0.1:4040', 'https://d43d-152-202-200-21.ngrok.io']
app.use(cors({
    credentials: true,
    origin: allowedOrigins
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

