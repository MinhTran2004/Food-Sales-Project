import axiosRetry from "axios-retry";
import { ProductModel, TypeProduct } from "../Model/ProductModel";
import axios from "axios";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export class ProductController {
    //lấy tất cả sản phẩm
    static async getAllProduct(): Promise<TypeProduct[]>{
        try{
            return await ProductModel.getAllProduct();
        }catch(err){
            console.log("Controller: ", err);
            throw err
        }
    }
    static async getSreachAllProduct(key: any){
        try{
            return await ProductModel.getSreachAllProduct(key)
        }catch(err){
            console.log(err);
        }
    }
    //update yêu thích sản phẩm
    static async updateLikeProduct(id: any, yeuthich: any){
        try{
            await ProductModel.updateLikeProduct(id, yeuthich)
            return await ProductController.getAllProduct()
        }catch(err){
            console.log("Controller: ", err);
        }
    }

    //lấy sản phẩm theo thể loại
    static async getCategoryProduct(theloai:any): Promise<TypeProduct[]>{
        try{
            return await ProductModel.getCategoryProduct(theloai);
        }catch(err){
            console.log("Controller: ", err);
            throw err;
        }
    }
}

