import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export class UserService {
    //kiem tra xem tai khoan co ton tai khong
    static async getUserByAccount(taikhoan: any) {
        try {
            const response = await axios.get(`https://65d37253522627d50108eb16.mockapi.io/api/User`, {
                params: { taikhoan: taikhoan }
            })
            if (response.data.length > 0) {
                return true
            } else {
                return false
            }
        } catch (err) {
            console.log(err);
        }
    }
    //get user by id
    static async getUserById(id: any) {
        try {
            const response = await axios.get(`https://65d37253522627d50108eb16.mockapi.io/api/User/${id}`)
            return response.data
        } catch (err) {
            console.log(err);
        }
    }
    //kiem tra xem tai khoan co ton tai khong
    static async checkUserLogin(taikhoan: any, matkhau: any) {
        try {
            const response = await axios.get(`https://65d37253522627d50108eb16.mockapi.io/api/User`, {
                params: {
                    taikhoan: taikhoan,
                    matkhau: matkhau
                }
            })
            if (response.data.length > 0) {
                if (response.data[0].matkhau === matkhau) {
                    return response.data
                } else {
                    return false
                }
            } else {
                return false
            }
        } catch (err) {
            console.log(err);
        }
    }
    //tao tai khoan
    static async addNewUser(data: any) {
        if (data) {
            try {
                await axios.post(`https://65d37253522627d50108eb16.mockapi.io/api/User`, data)
                return true
            } catch (err) {
                console.log(err);
            }
        } else {
            return false
        }
    }
    //update tai khoan
    static async updateUser(id: any, data: any) {
        if (data) {
            try {
                const reponse = await axios.patch(`https://65d37253522627d50108eb16.mockapi.io/api/User/${id}`, data)
                return reponse.data
            } catch (err) {
                console.log(err);
            }
        } else {
            return false
        }
    }
}