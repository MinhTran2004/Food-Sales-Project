// https://66836c0c4102471fa4ca04b7.mockapi.io/api/Favourite

import axios from "axios";
import axiosRetry from "axios-retry";
import { ProductController } from "../Controller/ProductController";
import { ProductModel } from "./ProductModel";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export interface TypeFavourite {
    id: String;
    makh: String;
    masp: String;
}

export class FavouriteModel {
    id: String;
    makh: String;
    masp: String;

    constructor(id: String = "", makh: String = "", masp: String = "") {
        this.id = id;
        this.makh = makh;
        this.masp = masp;
    }
    // Lấy tất cả sản phẩm yêu thích theo makh
    static async getAllFavouriteByMakh(makh: any) {
        try {
            const reponse = await axios.get(`https://66836c0c4102471fa4ca04b7.mockapi.io/api/Favourite`, {
                params: {
                    makh: makh
                }
            })
            if (reponse) {
                const promise = reponse.data.map(async (item: any) => {
                    if (item) {
                        return await ProductController.getAllProductByid(item.id)
                    } else {
                        return null
                    }
                })
                const data = await Promise.all(promise)
                
                return data;
            } else {
                return []
            }
        } catch (err) {
            throw err
        }
    }

    // udpate yeu thich san pham
    static async addNewFavourite(makh: any, masp: any) {
        try {
            const reponse = await axios.post(`https://66836c0c4102471fa4ca04b7.mockapi.io/api/Favourite`, {
                makh: makh,
                masp: masp
            })
            if (reponse) {
                return reponse.data
            } else {
                return false
            }
        } catch (err) {
            throw err
        }
    }
    // delete yeu thich san pham bang id
    static async deleteFavouriteById(masp: any, makh: any) {
        try {
            const getId = await axios.get(`https://66836c0c4102471fa4ca04b7.mockapi.io/api/Favourite`, {
                params: {
                    masp: masp,
                    makh: makh
                }
            })
            if (getId) {
                let id = getId.data[0].id
                try {
                    const reponse = await axios.delete(`https://66836c0c4102471fa4ca04b7.mockapi.io/api/Favourite/${id}`)
                    if (reponse) {
                        return reponse.data
                    } else {
                        return false
                    }
                } catch (err) {
                    console.log(err);
                }
            } else {
                return []
            }


        } catch (err) {
            throw err
        }
    }



}