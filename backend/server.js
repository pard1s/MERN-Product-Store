import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();
app.use(express.json()); // allows us to accept json data in the body; this is middleware!
app.use('/api/products', productRoutes)

app.listen(5000, () => {
    ConnectDB();
    console.log("server is running on http://localhost:5000");
});
