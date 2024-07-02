import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export interface TypeProduct {
    id: String;
    tensp: String;
    giasp: String;
    anhsp: String;
    luotmua:String,
    theloai: String;
    yeuthich: Boolean;
}

export class ProductModel implements TypeProduct {
    id: String;
    tensp: String;
    giasp: String;
    anhsp: String;
    luotmua:String;
    theloai: String;
    yeuthich: Boolean;

    constructor(id: String = "", tensp: String = "", giasp: String = "", anhsp: String = "", theloai: String = "", yeuthich: Boolean = false, luotmua:String = "") {
        this.id = id;
        this.tensp = tensp;
        this.theloai = theloai;
        this.giasp = giasp;
        this.luotmua = luotmua;
        this.anhsp = anhsp;
        this.yeuthich = yeuthich
    };

    //lấy tất cả sản phẩm có yêu thích = false
    static async getAllProduct(): Promise<ProductModel[]> {
        try {
            const reponse = await axios.get(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Product?yeuthich=false`);
            return reponse.data.map((item: any) => new ProductModel(
                item.id, item.tensp, item.giasp, item.anhsp, item.theloai, item.yeuthich, item.luotmua
            ));
        } catch (err) {
            console.log("ModelProduct: ", err);
            throw err
        }
    }
    //lấy tất cả sản phẩm theo id
    static async getAllProductByid(id:any): Promise<ProductModel> {
        try {
            const reponse = await axios.get(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Product/${id}`);
            return reponse.data
        } catch (err) {
            console.log("ModelProduct: ", err);
            throw err
        }
    }
    //lay san pham cho sreach
    static async getSreachAllProduct(key: any) {
        try {
            const response = await axios.get(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Product`);
            
            if (key) {
                const data = response.data.filter((item: any) => {
                    return item.tensp.toLowerCase().includes(key.toLowerCase());
                });
                return data;
            } else {
                return response.data;
            }
        } catch (err) {
            console.error("Error fetching products:", err);
            throw err; 
        }
    }
    //lấy sản phẩm theo thể loại
    static async getCategoryProduct(theloai: any): Promise<TypeProduct[]> {
        try {
            const reponse = await axios.get(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Product`, {
                params: {
                    yeuthich: false,
                    theloai: theloai
                }
            })
            return reponse.data.map((item: any) => new ProductModel(
                item.id, item.tensp, item.giasp, item.anhsp, item.theloai, item.yeuthich, item.luotmua
            ))
        } catch (err) {
            console.log("ProductModel: ", err);
            throw err
        }
    }
}