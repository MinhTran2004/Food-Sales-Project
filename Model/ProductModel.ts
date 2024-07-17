export class ProductModel {
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
}