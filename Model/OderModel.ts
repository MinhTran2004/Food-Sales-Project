import axios from "axios";
import axiosRetry from "axios-retry";
import { CartModel, TypeCart } from "./CartModel";
import { CartController } from "../Controller/CartController";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export interface TypeOder {
    id: String,
    masp: String,
    tongtien: String,
    trangthai: String,
}

export class OderModel implements TypeOder {
    id: String;
    masp: String;
    tongtien: String;
    trangthai: String;

    constructor(id: String = "", masp: String = "", tongtien: String = "", trangthai: String = "") {
        this.id = id,
            this.masp = masp,
            this.tongtien = tongtien,
            this.trangthai = trangthai
    }

    static async addNewOder(data: [], tongtien: String, trangthai: String) {
        var arrId = "";
        data.forEach((item: any) => {
            arrId = arrId + item.id + ",";
            CartController.deleteCartByid(item.id)
        });
        const magh = arrId.slice(0, -1)
        try {
            await axios.post(`https://65d37253522627d50108eb16.mockapi.io/api/Oder`, {
                magh: magh,
                tongtien: tongtien,
                trangthai: trangthai
            })

        } catch (err) {
            console.log(err);
        }
    }
    // :Promise<TypeOder[]>
    static async getAllOder() {
        try {
            const reposne = await axios.get(`https://65d37253522627d50108eb16.mockapi.io/api/Oder?trangthai=oder`)
            const promises =  reposne.data.map(async (item:any) => {
                const cart =  await CartController.getCartById(item.magh);
                return {cart, id: item.id, magh: item.magh, tongtien: item.tongtien, trangthai: item.trangthai}
            })
            
            const data = await Promise.all(promises)
            return data                         
        } catch (err) {
            throw err
        }
    }
}