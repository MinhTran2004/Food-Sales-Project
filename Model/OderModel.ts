import axios from "axios";
import axiosRetry from "axios-retry";
import { CartModel } from "./CartModel";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export interface TypeOder{
    id:String,
    masp:String,
    tongtien:String,
    trangthai:String, 
}

export class OderModel implements TypeOder{
    id:String;
    masp:String;
    tongtien:String;
    trangthai:String;
    
    constructor(id:String = "", masp:String = "", tongtien:String = "", trangthai:String = ""){
        this.id = id,
        this.masp = masp,
        this.tongtien = tongtien,
        this.trangthai = trangthai
    }

    static async getAllOder():Promise<TypeOder[]>{
        try{
            const reponse = await axios.get(`https://65d37253522627d50108eb16.mockapi.io/api/Oder`)
            return reponse.data.map((item:any) => {
                item.id, item.masp, item.tongtien, item.trangthai
            })
        }catch(err){
            throw err
        }
    }

    static async addNewOder( data: [], tongtien:String, trangthai:String ){
        var arrId = "";
        data.forEach((item:any) => {
            arrId = arrId + item.id + ","
        });          
        const magh = arrId.slice(0, -1)
        try{
            const reponse = await axios.post(`https://65d37253522627d50108eb16.mockapi.io/api/Oder`, {
                magh : magh,
                tongtien: tongtien,
                trangthai: trangthai
            })
        }catch(err){
            console.log(err);
        }
    }

    static async getOderById( id:any ){
        var listData = [];
        try{
            const reponse = await axios.get(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Cart${id}`)
            return reponse.data.map((item: any) => new CartModel(
                item.id, item.masp, item.tensp, item.theloai, item.giasp, item.anhsp, item.soluong, item.trangthai
            ))
        }catch(err){
            throw err
        }
    }


}