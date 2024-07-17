import axios from "axios";
import axiosRetry from "axios-retry";
import { CartController } from "../Controller/CartController";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export class OderService {
    //add data Oder
    static async addNewOrder(data: any[], tongtien: string, trangthai: string, makh: any) {
        var arrId = "";
        data.map((item: any) => {
            arrId = arrId + item.id + ",";
        });
        const magh = arrId.slice(0, -1);
        try {
            await axios.post('https://65d37253522627d50108eb16.mockapi.io/api/Oder', {
                magh: magh,
                tongtien: tongtien,
                trangthai: trangthai,
                makh: makh
            });
            await CartController.updateStatusCartByid(magh);
        } catch (err) {
            console.error("Error during POST request:", err);
        }
    }
    //lấy tất cả danh sách có trạng thái = "Active"
    static async getAllOderActive(makh: any, chucvu:any) {
        if(chucvu === "admin"){
            try {
                const reposne = await axios.get(`https://65d37253522627d50108eb16.mockapi.io/api/Oder?trangthai=Active`)
                if (reposne.data != null) {
                    const promises = reposne.data.map(async (item: any) => {
                        const cart = await CartController.getCartById(item.magh);
                        return { cart, id: item.id, magh: item.magh, tongtien: item.tongtien, trangthai: item.trangthai }
                    })
                    const data = await Promise.all(promises)
                    return data
                } else {
                    return []
                }
            } catch (err) {
                throw err
            }
        }else{
            try {
                const reposne = await axios.get(`https://65d37253522627d50108eb16.mockapi.io/api/Oder`, {
                    params: {
                        trangthai: "Active",
                        makh: makh
                    }
                })
                if (reposne.data != null) {
                    const promises = reposne.data.map(async (item: any) => {
                        const cart = await CartController.getCartById(item.magh);
                        return { cart, id: item.id, magh: item.magh, tongtien: item.tongtien, trangthai: item.trangthai }
                    })
                    const data = await Promise.all(promises)
                    return data
                } else {
                    return []
                }
            } catch (err) {
                throw err
            }
        }
    }
    //lấy tất cả danh sách có trạng thái = "Completed"
    static async getAllOderCompleted(makh: any, chucvu:any) {
        if(chucvu === "admin"){
            try {
                const reposne = await axios.get(`https://65d37253522627d50108eb16.mockapi.io/api/Oder?trangthai=Completed`)
                if (reposne.data != null) {
                    const promises = reposne.data.map(async (item: any) => {
                        const cart = await CartController.getCartById(item.magh);
                        return { cart, id: item.id, magh: item.magh, tongtien: item.tongtien, trangthai: item.trangthai }
                    })
                    const data = await Promise.all(promises)
                    return data
                } else {
                    return []
                }
            } catch (err) {
                throw err
            }
        }else{
            try {
                const reposne = await axios.get(`https://65d37253522627d50108eb16.mockapi.io/api/Oder`, {
                    params: {
                        trangthai: "Completed",
                        makh: makh
                    }
                })
                if (reposne.data != null) {
                    const promises = reposne.data.map(async (item: any) => {
                        const cart = await CartController.getCartById(item.magh);
                        return { cart, id: item.id, magh: item.magh, tongtien: item.tongtien, trangthai: item.trangthai }
                    })
                    const data = await Promise.all(promises)
                    return data
                } else {
                    return []
                }
            } catch (err) {
                throw err
            }
        }
    }
    //lấy tất cả danh sách có trạng thái = "Cancel"
    static async getAllOderCancel(makh: any, chucvu:any) {
        if(chucvu === "admin"){
            try {
                const reposne = await axios.get(`https://65d37253522627d50108eb16.mockapi.io/api/Oder?trangthai=Cancel`)
                if (reposne.data != null) {
                    const promises = reposne.data.map(async (item: any) => {
                        const cart = await CartController.getCartById(item.magh);
                        return { cart, id: item.id, magh: item.magh, tongtien: item.tongtien, trangthai: item.trangthai }
                    })
                    const data = await Promise.all(promises)
                    return data
                } else {
                    return []
                }
            } catch (err) {
                throw err
            }
        }else{
            try {
                const reposne = await axios.get(`https://65d37253522627d50108eb16.mockapi.io/api/Oder`, {
                    params: {
                        trangthai: "Cancel",
                        makh: makh
                    }
                })
                if (reposne.data != null) {
                    const promises = reposne.data.map(async (item: any) => {
                        const cart = await CartController.getCartById(item.magh);
                        return { cart, id: item.id, magh: item.magh, tongtien: item.tongtien, trangthai: item.trangthai }
                    })
                    const data = await Promise.all(promises)
                    return data
                } else {
                    return []
                }
            } catch (err) {
                throw err
            }
        }
    }
    // update trang thai khi xac nhan don hang
    static async updateStatusOder(id: any, status: any) {
        try {
            await axios.patch(`https://65d37253522627d50108eb16.mockapi.io/api/Oder/${id}`, {
                trangthai: status
            })
        } catch (err) {
            console.log(err);
        }
    }
}