import express ,{json} from "express";
import cors from "cors";
import router  from "./routes";
import bodyParser from 'body-parser';
import { connectDB } from "./config/db";
import { config } from "dotenv";
import path from "path";

const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));
config();

app.use('/uploads', express.static(path.join(__dirname,"..",'uploads')));
console.log(path.join(__dirname,"..",'uploads'));

connectDB().then(() =>{
     console.log("Database connected")
     app.listen(process.env.PORT, () => console.log(`Server is running on port http://localhost:${process.env.PORT}`));
    }).catch((err) => console.log(err));
