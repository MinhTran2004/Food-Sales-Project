export class CartModel {
    id: String;
    masp: String;
    tensp: String;
    theloai: String;
    giasp: String;
    anhsp: String;
    soluong: String;
    trangthai: Boolean;
    makh: String;

    constructor(id: String = "", masp: String = "", tensp: String = "", theloai: String = "", giasp: String = "", anhsp: String = "", soluong: String = "", trangthai: Boolean = true, makh: String = "") {
        this.id = id;
        this.masp = masp;
        this.tensp = tensp;
        this.theloai = theloai;
        this.giasp = giasp;
        this.anhsp = anhsp;
        this.soluong = soluong;
        this.trangthai = trangthai;
        this.makh = makh
    }
}
