import express from "express"
import cors from "cors"
import route from "./src/routes/router.js";
const app = express();
app.use(express.json())
app.use(cors());
app.use(route);


app.listen(3000,()=>{
    console.log("servidor rodando na porta 3000");
});