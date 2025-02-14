import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';

// function for addProduct

const addProduct=async (req,res)=>{
    try {
        const {name,description,price,category,subCategory,sizes,bestSeller}=req.body;
        console.log(category);
        
        const image1=req.files.image1 && req.files.image1[0];
        const image2=req.files.image2 && req.files.image2[0];
        const image3=req.files.image3 && req.files.image3[0];
        const image4=req.files.image4 && req.files.image4[0];

        const images=[image1,image2,image3,image4].filter((item)=>item!==undefined);
        let imagesURL=await Promise.all(
            images.map(async (item)=>{
                let result=await cloudinary.uploader.upload(item.path,{resource_type: 'image'});
                return result.secure_url;
            })
        )
        // console.log(name,description,price,category,subCategory,sizes,bestSeller);
        // console.log(imagesURL);
        const productData={
            name,
            description,
            price:Number(price),
            category,
            subCategory,
            sizes:JSON.parse(sizes),
            bestSeller:bestSeller==="true"?true:false,
            image:imagesURL,
            date:Date.now()
        }
        console.log(productData);
        const product = new productModel(productData);
        await product.save();
        res.json({success:true,message:"Product added"});

    } catch (error) {
        console.log(error);
        res.json({success: false,message:error.message});
    }

}

// function for list Product

const listProducts=async (req,res)=>{
    try {
        const products = await productModel.find({});
        res.json({success: true,products});
    } catch (error) {
        console.error(error);
        res.json({success: false,message:error.message});
    }

}

// function for removing product

const removeProduct=async (req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Product removed"})
    } catch (error) {
        console.error(error);
        res.json({success: false,message:error.message});
    }
}

// function for single Product

const singleProduct=async (req,res)=>{
    try {
        const {productId}=req.body;
        const product =await productModel.findOne(productId);
        res.json({success:true,product})

    } catch (error) {
        console.error(error);
        res.json({success: false,message:error.message});
    }
}

export {addProduct,removeProduct,listProducts,singleProduct}
