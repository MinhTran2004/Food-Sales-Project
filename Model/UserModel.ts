export class UserModel {
    id: String;
    ten: String;
    taikhoan: String;
    matkhau: String;
    sdt: String;
    diachi: String;
    chucvu: String;

    constructor(id: String = "", ten: String = "", taikhoan: String = "", matkhau: String = "", sdt: String = "", diachi: String = "", chucvu: String = "") {
        this.id = id,
            this.ten = ten,
            this.taikhoan = taikhoan,
            this.matkhau = matkhau,
            this.sdt = sdt,
            this.diachi = diachi,
            this.chucvu = chucvu
    }
}