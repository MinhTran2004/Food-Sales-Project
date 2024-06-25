import axios from "axios";
import axiosRetry from "axios-retry";
import { OderModel } from "../Model/OderModel";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export class OderController {
    
    static async addNewOder ( arrId: [], tongtien:String, trangthai:String ){
        try{
            await OderModel.addNewOder( arrId, tongtien, trangthai )
        }catch(err){
            console.log(err);
        }
    }
}