import axios from "axios";
import axiosRetry from "axios-retry";
import { OderModel } from "../Model/OderModel";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export class OderController {
    //add data Oder
    static async addNewOder(arrId: [], tongtien: any, trangthai: any, makh:any) {
        try {
            await OderModel.addNewOrder(arrId, tongtien, trangthai, makh)
        } catch (err) {
            console.log(err);
        }
    }
    //lấy tất cả danh sách có trạng thái = "Active"
    static async getAllOderActive(makh:any, chucvu:any) {
        try {
            return await OderModel.getAllOderActive(makh, chucvu)
        } catch (err) {
            throw err
        }
    }
    //lấy tất cả danh sách có trạng thái = "Completed"
    static async getAllOderCompleted(makh:any, chucvu:any) {
        try {
            return await OderModel.getAllOderCompleted(makh, chucvu)
        } catch (err) {
            throw err
        }
    }
    //lấy tất cả danh sách có trạng thái = "Cancel"
    static async getAllOderCancel(makh:any, chucvu:any) {
        try {
            return await OderModel.getAllOderCancel(makh, chucvu)
        } catch (err) {
            throw err
        }
    }
    // update trang thai khi xac nhan don hang
    static async updateStatusOder(id: any, status: any, makh:any, chucvu:any) {
        try {
            await OderModel.updateStatusOder(id, status)
            return await OderController.getAllOderActive(makh, chucvu)
        } catch (err) {
            console.log(err);
        }
    }
}