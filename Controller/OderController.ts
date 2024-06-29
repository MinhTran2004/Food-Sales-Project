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
    static async addNewOder(arrId: [], tongtien: any, trangthai: any) {
        try {
            await OderModel.addNewOrder(arrId, tongtien, trangthai)
        } catch (err) {
            console.log(err);
        }
    }
    //lấy tất cả danh sách có trạng thái = "Active"
    static async getAllOderActive() {
        try {
            return await OderModel.getAllOderActive()
        } catch (err) {
            throw err
        }
    }
    //lấy tất cả danh sách có trạng thái = "Completed"
    static async getAllOderCompleted() {
        try {
            return await OderModel.getAllOderCompleted()
        } catch (err) {
            throw err
        }
    }
    //lấy tất cả danh sách có trạng thái = "Cancel"
    static async getAllOderCancel() {
        try {
            return await OderModel.getAllOderCancel()
        } catch (err) {
            throw err
        }
    }
    // update trang thai khi xac nhan don hang
    static async updateStatusOder(id: any, status: any) {
        try {
            await OderModel.updateStatusOder(id, status)
            await OderController.getAllOderActive()
        } catch (err) {
            console.log(err);
        }
    }
}