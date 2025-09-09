import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" });
        }

        res.status(200).json({
            success: true,
            message: "Product found successfully!",
            data: product
        })
    } catch (error) {
        console.log("Error in fetching product: ", error.message);

        if (error.name == 'CastError') {
            return res.status(400).json({ success: false, message: "data type mismatch!" });
        }

        return res.status(500).json({ success: false, message: "Server Error x" });
    }
}


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            success: true,
            message: `Found ${products.length} products`,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.log("Error in fetching products: ", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error x"
        })
    }
}


export const creatProduct = async (req, res) => {
    const product = req.body;
    console.log(product);
    if (!product || !product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields!" }); // 400 - bad client request
    }


    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });  // 201 - something created
    } catch (error) {
        console.log("Error in creating product:", error.message);
        res.status(500).json({
            success: false,
            message: "server error x"
        }); // 500 - server error 
    }
}


export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        // First, check if the product exists
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: `Product with ID ${id} not found!`
            });
        }

        // If product exists, delete it
        await Product.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: `Product "${product.name}" deleted successfully!`
        });

    } catch (error) {
        console.log("Error in deleting product: ", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error while deleting product"
        });
    }
}


export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    try {
        //check if the product exist
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true }); // the new: true will return the updated object

        return res.status(200).json(
            {
                success: true,
                message: "Product Updated Successfully!",
                data: updatedProduct,
            }
        )
    } catch (error) {
        console.log("Error in updating product: ", error.message);

        if (error.name == "CastError") {
            return res.status(404).json({ success: false, message: "Id not valid!" });
        }

        return res.status(500).json({ sucess: false, message: "Server Error x" });
    }
}


