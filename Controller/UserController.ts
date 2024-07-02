import axios from "axios";
import axiosRetry from "axios-retry";
import { UserModel } from "../Model/UserModel";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export class userController {
    //kiem tra xem tai khoan co ton tai khong
    static async getUserByAccount(taikhoan: any){
        try{
            return await UserModel.getUserByAccount(taikhoan)
        }catch(err){
            console.log(err);
        }
    }
    //get user by id
    static async getUserById(id: any){
        try{
            return await UserModel.getUserById(id)
        }catch(err){
            console.log(err);
        }
    }
    //kiem tra xem tai khoan co ton tai khong
    static async checkUserLogin(taikhoan: any, matkhau: any){
        try{
            return UserModel.checkUserLogin(taikhoan, matkhau)
        }catch(err){
            console.log(err);
        }
    }
    //tao tai khoan
    static async addNewUser(data: any) {
        try {
            await UserModel.addNewUser(data)
        } catch (err) {
            console.log(err);
        }
    }
    //update tai khoa123
    static async updateUser(id: any, data: any) {
        try {
           return await UserModel.updateUser(id, data)
        } catch (err) {
            console.log(err);
        }
    }

}