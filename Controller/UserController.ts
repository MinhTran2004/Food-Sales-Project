import axios from "axios";
import axiosRetry from "axios-retry";
import { UserService } from "../Services/UserService";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export class userController {
    //kiem tra xem tai khoan co ton tai khong
    static async getUserByAccount(taikhoan: any){
        try{
            return await UserService.getUserByAccount(taikhoan)
        }catch(err){
            console.log(err);
        }
    }
    //get user by id
    static async getUserById(id: any){
        try{
            return await UserService.getUserById(id)
        }catch(err){
            console.log(err);
        }
    }
    //kiem tra xem tai khoan co ton tai khong
    static async checkUserLogin(taikhoan: any, matkhau: any){
        try{
            return UserService.checkUserLogin(taikhoan, matkhau)
        }catch(err){
            console.log(err);
        }
    }
    //tao tai khoan
    static async addNewUser(data: any) {
        try {
            await UserService.addNewUser(data)
        } catch (err) {
            console.log(err);
        }
    }
    //update tai khoa123
    static async updateUser(id: any, data: any) {
        try {
           return await UserService.updateUser(id, data)
        } catch (err) {
            console.log(err);
        }
    }

}