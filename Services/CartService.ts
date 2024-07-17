import axios from "axios";
import axiosRetry from "axios-retry";
import { CartModel } from "../Model/CartModel";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export class CartService{
    //them san pham theo makh
    static async addNewCart(data: any, makh: any) {
        try {
            await axios.post(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Cart`, {
                masp: data.masp,
                tensp: data.tensp,
                theloai: data.theloai,
                giasp: data.giasp,
                anhsp: data.anhsp,
                soluong: "1",
                trangthai: true,
                makh: makh
            })
        } catch (err) {
            throw err
        }
    }
    //lat tat ca san pham
    static async getAllCart(makh: any, chucvu: any) {
        if (chucvu == "Khachhang") {
            try {
                const reponse = await axios.get(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Cart`, {
                    params: {
                        trangthai: true,
                        makh: makh
                    }
                })
                if (reponse.data != null) {
                    return reponse.data.map((item: any) => new CartModel(
                        item.id, item.masp, item.tensp, item.theloai, item.giasp, item.anhsp, item.soluong, item.trangthai
                    ))
                } else {
                    return []
                }
            } catch (err) {
                throw err
            }
        }else{
            try {
                const reponse = await axios.get(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Cart?trangthai=true`)
                if (reponse.data != null) {
                    return reponse.data.map((item: any) => new CartModel(
                        item.id, item.masp, item.tensp, item.theloai, item.giasp, item.anhsp, item.soluong, item.trangthai
                    ))
                } else {
                    return []
                }
            } catch (err) {
                throw err
            }
        }
    }
    //lay san pham theo id
    static async getCartById(id: String) {
        var arrId = id.split(",");
        try {
            const promises = arrId.map(async (item) => {
                const response = await axios.get(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Cart/${item}`);
                return response.data;
            });
            const responses = await Promise.all(promises);

            return responses.map((item) => new CartModel(
                item.id, item.masp, item.tensp, item.theloai, item.giasp, item.anhsp, item.soluong, item.trangthai
            ));
        } catch (err) {
            throw err;
        }
    }
    //delete trang thai san pham
    static async deleteCartByid(id: any) {
        try {
            await axios.delete(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Cart/${id}`)
        } catch (err) {
            console.log(err);
        }
    }
    //update trang thai san pham
    static async updateStatusCartByid(id: any) {
        var arrId = id.split(",");
        try {
            arrId.map(async (item: any) => {
                await axios.patch(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Cart/${item}`, {
                    trangthai: false
                });
            });
        } catch (err) {
            throw err
        }
    }
    //update so luong
    static async updateSoluong(id: any, soluong: any, trangthai: Boolean) {
        try {
            if (trangthai) {
                await axios.patch(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Cart/${id}`, {
                    soluong: Number(soluong) + 1
                })
            } else {
                await axios.patch(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Cart/${id}`, {
                    soluong: Number(soluong) - 1
                })
            }
        } catch (err) {
            throw err
        }
    }
    //update tong tien
    static async updateTongTien(data: any) {
        try {
            let sum = 0;
            data.map((item: any) => {
                return sum = sum + Number(item.giasp) * Number(item.soluong)
            })
            return String(sum)
        } catch (err) {
            console.log(err);
        }
    }
}

