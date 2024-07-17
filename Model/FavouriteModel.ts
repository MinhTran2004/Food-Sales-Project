export class FavouriteModel {
    id: String;
    makh: String;
    masp: String;

    constructor(id: String = "", makh: String = "", masp: String = "") {
        this.id = id;
        this.makh = makh;
        this.masp = masp;
    }
}