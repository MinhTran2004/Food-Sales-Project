import axios from "axios";
import axiosRetry from "axios-retry";
import { CartService } from "../Services/CartService";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export class CartController {
    // lấy tất cả sản phẩm trong cart
    static async getAllCart(makh:any, chucvu:any) {
        try {
            return await CartService.getAllCart(makh, chucvu)
        } catch (err) {
            return []
        }
    }
    // lấy tất cả sản phẩm trong cart theo id
    static async getCartById(id: String){
        try{
            return await CartService.getCartById(id)
        }catch(err){
            throw err
        }
    }
    // thêm sản phẩm
    static async addNewCart(data: any, makh:any) {
        try {
            await CartService.addNewCart(data, makh)
        } catch (err) {
            throw err
        }
    }
    // xóa sản phẩm theo id
    static async deleteCartByid(id: any, makh:any, chucvu:any) {
        try {
            await CartService.deleteCartByid(id)
            await CartController.getAllCart(makh, chucvu)
        } catch (err) {
            throw err
        }
    }
    // xóa sản phẩm theo id
    static async updateStatusCartByid(id: any) {
        try {
            await CartService.updateStatusCartByid(id)
        } catch (err) {
            throw err
        }
    }
    // update số lượng
    static async updateSoluong(id: any, soluong: any, trangthai: Boolean, makh:any, chucvu:any) {
        try {
            if (soluong < 1) {
                await CartController.deleteCartByid(id, makh, chucvu)
                return await CartController.getAllCart( makh, chucvu )
            } else {
                await CartService.updateSoluong(id, soluong, trangthai)
                return await CartController.getAllCart( makh, chucvu )
            }
        } catch (err) {
            throw err
        }
    }

    static async updateTongTien(data: any) {
        try{
            return await CartService.updateTongTien(data)
        }catch(err){
            console.log(err);
        }
    }

}