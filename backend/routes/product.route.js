import express from "express";
import { getProduct, getAllProducts, creatProduct, deleteProduct, updateProduct } from "../controllers/product.controller.js";


const router = express.Router();

router.get("/", (req, res) => {
    res.send("Server is ready!");
})

// Get a single product by ID
router.get("/get/:id", getProduct);

// Get all products
router.get("/getAll", getAllProducts);

// create a product
router.post("/create", creatProduct);

// Delete a product
router.delete("/delete/:id", deleteProduct);

// Update a product - update all : PUT, update some fields: Patch
router.put("/update/:id", updateProduct);


export default router;