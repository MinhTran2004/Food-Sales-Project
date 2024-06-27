import axios from "axios";
import axiosRetry from "axios-retry";
import { CartModel, TypeCart } from "../Model/CartModel";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export class CartController {
    // lấy tất cả sản phẩm trong cart
    static async getAllCart(): Promise<TypeCart[]> {
        try {
            return await CartModel.getAllCart()
        } catch (err) {
            throw err
        }
    }
    // lấy tất cả sản phẩm trong cart theo id
    static async getCartById(id: String){
        try{
            return await CartModel.getCartById(id)
        }catch(err){
            throw err
        }
    }
    // thêm sản phẩm
    static async addNewCart(data: any) {
        try {
            const reponse = await CartModel.addNewCart(data)
            return await CartController.getAllCart()
        } catch (err) {
            throw err
        }
    }
    // xóa sản phẩm theo id
    static async deleteCartByid(id: any) {
        try {
            const reponse = await CartModel.deleteCartByid(id)
            return await CartController.getAllCart()
        } catch (err) {
            throw err
        }
    }
    // update số lượng
    static async updateSoluong(id: any, soluong: any, trangthai: Boolean) {
        try {
            if (soluong < 1) {
                await CartController.deleteCartByid(id)
                return await CartController.getAllCart()
            } else {
                await CartModel.updateSoluong(id, soluong, trangthai)
                return await CartController.getAllCart()
            }
        } catch (err) {
            throw err
        }
    }

    static async updateTongTien(data: any) {
        return await CartModel.updateTongTien(data)
    }

}