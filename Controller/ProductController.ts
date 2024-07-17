import axiosRetry from "axios-retry";
import axios from "axios";
import { ProductService } from "../Services/ProductService";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export class ProductController {
    //lấy tất cả sản phẩm
    static async getAllProduct() {
        try {
            return await ProductService.getAllProduct();
        } catch (err) {
            console.log("Controller: ", err);
            throw err
        }
    }
    static async getSreachAllProduct(key: any) {
        try {
            return await ProductService.getSreachAllProduct(key)
        } catch (err) {
            console.log(err);
        }
    }
    //lấy tất cả sản phẩm theo id
    static async getAllProductByid(id: any) {
        try {
            return await ProductService.getAllProductByid(id)
        } catch (err) {
            throw err
        }
    }
    //lấy sản phẩm theo thể loại
    static async getCategoryProduct(theloai: any) {
        try {
            return await ProductService.getCategoryProduct(theloai);
        } catch (err) {
            console.log("Controller: ", err);
            throw err;
        }
    }
}

