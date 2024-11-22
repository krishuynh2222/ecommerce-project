import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: Array, required: true},
    category: {type: String, required: true},
    subCategory: {type: String, required: true},
    sizes: {type: Array, required: true},
    bestseller: {type: Boolean},
    date: {type: Number, required: true},
})

//using this schema - we have created and stored in this product model
//operator - when the product model is already available then
    // model will used that productmodel will be assigned
    //if it not available - it will create a new model using this schema
    const productModel = mongoose.models.product ||   mongoose.model("product", productSchema);

export default productModel;