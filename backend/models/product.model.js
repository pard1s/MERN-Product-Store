import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required!"],
        minlength: [3, "Product name must be at least 3 characters long!"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required!"],
        validate: {
            validator: (value) => {
                return value > 0;
            },
            message: "Product price must be greater than 0!",
        }
    },
    image: {
        type: String,
        required: [true, "Product image is required!"],
    }
},
    {
        timestamps: true, //createdAt and updatedAt
    }
)

// as arrow functions don't have their own this context use regular functions 
productSchema.pre("save", function (next) {
    console.log("Product:", this.name, "is being saved!");
    next();
});

productSchema.post("save", function (doc) {
    console.log("Product:", doc.name, "saved successfully!");
});

const Product = mongoose.model("Product", productSchema);
export default Product;