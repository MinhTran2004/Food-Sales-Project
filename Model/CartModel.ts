import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});
export interface TypeCart {
    id: String;
    masp: String;
    tensp: String;
    theloai: String;
    giasp: String;
    anhsp: String;
    soluong: String;
    trangthai: Boolean;
}

export class CartModel implements TypeCart {
    id: String;
    masp: String;
    tensp: String;
    theloai: String;
    giasp: String;
    anhsp: String;
    soluong: String;
    trangthai: Boolean;

    constructor(id: String = "", masp: String = "", tensp: String = "", theloai: String = "", giasp: String = "", anhsp: String = "", soluong: String = "", trangthai: Boolean = true) {
        this.id = id;
        this.masp = masp;
        this.tensp = tensp;
        this.theloai = theloai;
        this.giasp = giasp;
        this.anhsp = anhsp;
        this.soluong = soluong;
        this.trangthai = trangthai;
    }

    static async addNewCart(data: any) {
        try {
            const reponse = await axios.post(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Cart`, {
                masp: data.masp,
                tensp: data.tensp,
                theloai: data.theloai,
                giasp: data.giasp,
                anhsp: data.anhsp,
                soluong: "1",
                trangthai: true,
            })
        } catch (err) {
            throw err
        }
    }
    //lat tat ca san pham
    static async getAllCart(): Promise<TypeCart[]> {
        try {
            const reponse = await axios.get(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Cart?trangthai=true`)
            return reponse.data.map((item: any) => new CartModel(
                item.id, item.masp, item.tensp, item.theloai, item.giasp, item.anhsp, item.soluong, item.trangthai
            ))
        } catch (err) {
            throw err
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
    //update trang thai san pham
    static async deleteCartByid(id: any) {
        try {
            await axios.patch(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Cart/${id}`, {
                trangthai: false
            })
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
        let sum = 0; 
        data.map((item:any) => {
            return sum = sum + Number(item.giasp) * Number(item.soluong)
        })
        return String(sum) 
    }
}
