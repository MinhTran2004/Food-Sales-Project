// https://66836c0c4102471fa4ca04b7.mockapi.io/api/Favourite

import axios from "axios";
import axiosRetry from "axios-retry";
import { FavouriteModel } from "../Model/FavouriteModel";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export class FavouriteController {
    // Lấy tất cả sản phẩm yêu thích theo makh
    static async getAllFavouriteByMakh(makh: any) {
        try {
            return await FavouriteModel.getAllFavouriteByMakh(makh)
        } catch (err) {
            throw err
        }
    }
    // udpate yeu thich san pham
    static async addNewFavourite(makh: any, masp: any) {
        try {
            return await FavouriteModel.addNewFavourite(makh, masp)
        } catch (err) {
            throw err
        }
    }
    // delete yeu thich san pham bang id
    static async deleteFavouriteById(masp: any, makh:any) {
        try{
            return await FavouriteModel.deleteFavouriteById(masp, makh)
        }catch(err){
            console.log(err);
        }
    }


}