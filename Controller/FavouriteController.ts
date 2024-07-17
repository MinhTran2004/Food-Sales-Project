import axios from "axios";
import axiosRetry from "axios-retry";
import { FavouriteService } from "../Services/FavouriteService";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export class FavouriteController {
    // Lấy tất cả sản phẩm yêu thích theo makh
    static async getAllFavouriteByMakh(makh: any) {
        try {
            return await FavouriteService.getAllFavouriteByMakh(makh)
        } catch (err) {
            throw err
        }
    }
    // udpate yeu thich san pham
    static async addNewFavourite(makh: any, masp: any) {
        try {
            return await FavouriteService.addNewFavourite(makh, masp)
        } catch (err) {
            throw err
        }
    }
    // delete yeu thich san pham bang id
    static async deleteFavouriteById(masp: any, makh:any) {
        try{
            return await FavouriteService.deleteFavouriteById(masp, makh)
        }catch(err){
            console.log(err);
        }
    }
}