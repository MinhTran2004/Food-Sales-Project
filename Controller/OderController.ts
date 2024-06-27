import axios from "axios";
import axiosRetry from "axios-retry";
import { OderModel, TypeOder } from "../Model/OderModel";
import { CartModel } from "../Model/CartModel";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export class OderController {

    static async addNewOder(arrId: [], tongtien: String, trangthai: String) {
        try {
            await OderModel.addNewOder(arrId, tongtien, trangthai)
        } catch (err) {
            console.log(err);
        }
    }

    static async getAllOder(): Promise<TypeOder[]> {
        try {
            return await OderModel.getAllOder()
        } catch (err) {
            throw err
        }
    }
}