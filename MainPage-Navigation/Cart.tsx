import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList, ScrollView } from 'native-base';

interface Product {
    masp: String,
    tensp: String,
    giasp: String,
    anhsp: String,
    theloai: String,
    soluong: String,
    tongtien: String,
    trangthai: true,
}

export default function Cart({ navigation }: any) {
    const [data, setData] = useState<Product[]>([]);
    const [tongTien, setTongTien] = useState("");

    // lay tat ca du lieu 
    const getData = async () => {
        try {
            await axios.get(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Cart`, {
                params: {
                    trangthai: true
                }
            }).then((reponse) => {
                setData(reponse.data);
            })
                .catch((err) => {
                    console.log(err);
                })
        } catch (err) {
            console.log(err);
        }
    }

    // xoa du lieu theo id
    const deleteProduct = async (id: any) => {
        try {
            const reponse = await axios.delete(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Cart/${id}`);
            getData();
        } catch (err) {
            console.log(err);
        }
    }

    // Update so luong san pham 
    const updateSoluong = async ({ id, soluong, status }: any) => {
        if (Number(soluong) > 0) {
            if (status == "1") {
                let quantity = Number(soluong) + 1
                try {
                    const reponse = await axios.patch(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Cart/${id}`, { soluong: quantity })
                    console.log(reponse.data);
                    getData();
                } catch (err) {
                    console.log(err);
                }
            } else if (status == "-1") {
                let quantity = Number(soluong) - 1
                try {
                    const reponse = await axios.patch(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Cart/${id}`, { soluong: quantity })
                    console.log(reponse.data);
                    getData();
                } catch (err) {
                    console.log(err);
                }
            }
        } else {
            console.log("Sai dữ liệu < 0");
        }
    }

    const renderItem = ({ item }: any) => {
        return (
            <View style={style.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: item.anhsp }} style={{ width: 90, height: 90, borderRadius: 10 }} />

                    <View style={style.layout_item}>
                        <View>
                            <Text style={style.name_product}>{item.tensp}</Text>
                            <Text style={style.title_product}>{item.theloai}</Text>
                        </View>
                        <Text style={style.price_product}>$ {item.giasp}</Text>
                    </View>

                    <View style={{ alignSelf: 'flex-end' }}>
                        <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: 30 }}>
                            <TouchableOpacity style={{ padding: 1 }} onPress={() => updateSoluong({ id: item.id, soluong: item.soluong, status: "-1" })}>
                                <Image source={require('../Image/minus.png')} style={{ width: 15, height: 15 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, marginLeft: 10, marginRight: 10, fontWeight: 'bold', color: 'white' }}>{item.soluong}</Text>
                            <TouchableOpacity style={{ padding: 1 }} onPress={() => updateSoluong({ id: item.id, soluong: item.soluong, status: "1" })}>
                                <Image source={require('../Image/plus.png')} style={{ width: 15, height: 15 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={() => { deleteProduct(item.id) }}>
                    <Text style={{ marginRight: 10, fontSize: 17, color: 'white', textDecorationLine: "underline" }}>Xóa</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const getTongTien = () => {
        let tong = 0;
        for (let i = 0; i < data.length; i++) {
            tong = tong + Number(data[i].giasp) * Number(data[i].soluong);
        }
        setTongTien(String(tong));;
    }

    useEffect(() => {
        getData();
        getTongTien();
    }, [data])
    
    return (
        <View style={{ flex: 1, backgroundColor: '#1d1d21' }}>
            <ScrollView>
                <View style={{ flex: 1, padding: 5 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { navigation.navigate("Home"), { data: { data } } }} style={{ marginTop: 10, marginLeft: 10, marginBottom: 10 }}>
                            <Image source={require("../Image/return.png")} style={{ height: 25, width: 25, tintColor: 'white' }} />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, marginLeft: 20 }}>Cart</Text>
                    </View>

                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        scrollEnabled={false} />
                </View>
            </ScrollView>

            <View style={{ padding: 10, backgroundColor: '#1f222a' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Tổng tiền: </Text>
                    <Text style={{ fontSize: 20, color: 'white' }}>{tongTien}</Text>
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate("CheckOder") }} style={{ backgroundColor: 'green', padding: 10 }}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>Mua Hàng</Text>
                </TouchableOpacity>
            </View>

        </View>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        padding: 5,
        paddingLeft: 10,
        flexDirection: 'row',
        borderRadius: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1f222a'
    },
    tieude: {
        textAlign: 'center',
        fontSize: 23,
        color: 'black',
        fontWeight: 'bold'
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