export class OderModel {
    id: String;
    masp: String;
    tongtien: String;
    trangthai: String;

    constructor(id: String = "", masp: String = "", tongtien: String = "", trangthai: String = "") {
        this.id = id,
            this.masp = masp,
            this.tongtien = tongtien,
            this.trangthai = trangthai
    }
}