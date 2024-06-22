import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CheckOder({ navigation }: any) {
    const [data, setData] = useState("");
    const [tongTien, setTongTien] = useState("");
    const [magh, setMagh] = useState("");

    const getAllProductByCart = async () => {
        try {
            await axios.get("https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Cart")
                .then(reponse => setData(reponse.data))
        } catch (err) {
            console.log(err);
        }
    }

    // add new Oder 
    const addNewOder = async () => {
        await axios.post("https://65d37253522627d50108eb16.mockapi.io/api/Oder",
            {
                masp: magh,
                tongtien: tongTien,
                trangthai: "Active",
            }
        )
    }

    // update status Cart 
    // const updateStatusCart = async (id: any) => {
    //     try {
    //         await axios.patch(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Cart/${id}`,
    //             {
    //                 params: {
    //                     trangthai: false
    //                 }
    //             }
    //         )
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const getTongTien = () => {
        let tong = 0;
        for (let i = 0; i < data.length; i++) {
            tong = tong + Number(data[i].giasp * data[i].soluong);
        }
        setTongTien(String(tong));
    }

    //lay san pham trong gio hang
    const getMaSanPham = () => {
        var ma = "";
        // ma = data[0].id,
        for (let i = 1; i < data.length; i++) {
            ma = ma + "," + data[i].id;
        }
        setMagh(ma);
    }

    // const setStatusProductByCart = () => {
    //     for (let i = 0; i < data.length; i++) {
    //         updateStatusCart(data[0].id)
    //     }
    // }


    const renderProduct = ({ item }: any) => {
        return (
            <View style={style.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: item.anhsp }} style={{ width: 90, height: 90, borderRadius: 10 }} />

                        <View style={style.layout_item}>
                            <View>
                                <Text style={style.name_product}>{item.tensp}</Text>
                                <Text style={style.title_product}>{item.theloai}</Text>
                            </View>
                            <Text style={style.price_product}>$ {item.giasp}</Text>
                        </View>
                    </View>

                    <View style={{ alignSelf: 'flex-end' }}>
                        <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: 30 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>x {item.soluong}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    useEffect(() => {
        getAllProductByCart();
        getTongTien();
        getMaSanPham();
    }, [data])

    return (
        <ScrollView style={{ backgroundColor: '#1d1d21', }}>
            <View style={{ flex: 1 }}>

                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { navigation.navigate("Cart") }} style={{ marginTop: 15, marginLeft: 15, marginBottom: 10 }}>
                            <Image source={require("../Image/return.png")} style={{ height: 20, width: 20, tintColor: 'white' }} />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: 20 }}>Check Oder</Text>
                    </View>

                    <View style={{ padding: 10, backgroundColor: '#1f222a', marginLeft: 10, marginRight: 10, borderRadius: 20, marginTop: 5 }}>
                        <Text style={{ color: 'white', borderBottomWidth: 1, borderColor: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 15, paddingBottom: 10 }}>Thông tin và địa chỉ nhận hàng</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require("../Image/location.png")} style={{ width: 20, height: 20, tintColor: 'white' }} />
                            <View style={{ paddingLeft: 5, paddingRight: 30 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>Trần Công Minh</Text>
                                    <Text style={{ color: 'white', fontSize: 18, marginLeft: 20 }}>(+84) (0976577025)</Text>
                                </View>
                                <Text style={{ color: 'white', fontSize: 18, marginTop: 10 }}>Ngõ 63 Đường Lê Đức Thọ, Nam Từ Liêm, Hà Nội</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ padding: 10, backgroundColor: '#1f222a', marginTop: 10, marginLeft: 10, marginRight: 10, borderRadius: 20 }}>
                        <Text style={{ color: 'white', borderBottomWidth: 1, borderColor: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10, paddingBottom: 10 }}>Sản phẩm</Text>

                        <FlatList
                            data={data}
                            renderItem={renderProduct}
                            scrollEnabled={false} />

                    </View>
                </View>

                <View style={{ flex: 1 }}>
                    <View style={{ backgroundColor: '#1f222a', margin: 10, paddingLeft: 10, paddingRight: 10, paddingTop: 10, borderRadius: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <Image source={require("../Image/bill.png")} style={{ width: 19, height: 19, tintColor: 'yellow', marginRight: 10, }} />
                            <Text style={{ color: 'white', fontSize: 18, marginBottom: 5 }}>Chi tiết thanh toán</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Tổng tiền hàng</Text>
                            <Text style={{ color: 'green', fontSize: 16, textDecorationLine: 'line-through', textDecorationColor: 'black' }}>$ 20.000</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Tổng tiền chi phí vận chuyển</Text>
                            <Text style={{ color: 'green', fontSize: 16, textDecorationLine: 'line-through', textDecorationColor: 'black' }}>$ 20.000</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }} >
                            <Text style={{ color: 'white', fontSize: 20 }}>Tổng thanh toán</Text>
                            <Text style={{ color: 'red', fontSize: 20 }}>$ {tongTien}</Text>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity style={{ backgroundColor: 'green', marginLeft: 10, marginRight: 10, marginBottom: 10, marginTop: 10, borderRadius: 25 }}
                            onPress={() => {
                                navigation.navigate("Home"),
                                    addNewOder();
                            }}>
                            <Text style={{ color: 'red', fontSize: 20, textAlign: 'center', padding: 10, fontWeight: 'bold' }}>Mua hàng - {tongTien}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        borderRadius: 15,
        borderBottomWidth: 1,
        borderColor: 'white',
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1f222a'
    },
    layout_item: {
        marginLeft: 10,
        height: '100%',
        justifyContent: 'space-between'
    },
    name_product: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    title_product: {
        fontSize: 13,
        color: 'white'
    },
    price_product: {
        fontSize: 19,
        color: 'green',
        fontWeight: 'bold',
    },
})