import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList, ScrollView } from 'native-base';
import { TypeCart } from '../Model/CartModel';
import { CartController } from '../Controller/CartController';
import axiosRetry from 'axios-retry';

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export default function Cart({ navigation }: any) {
    const [data, setData] = useState<any>([]);
    const [tongTien, setTongTien] = useState<any>("");
    //lay tat ca san pham
    const getAllCart = async ()=>{
        try{
            const reponse = await CartController.getAllCart()
            setData(reponse)
        }catch(err){
            console.log(err);
        }
    }
    //xoa san pham theo id
    const deleteCartByid = async (id:any) => {
        try{
            const reponse = await CartController.deleteCartByid(id)
            // setData(reponse)
            // console.log(reponse);
        }catch(err){
            console.log(err);
        }
    }
    //udpate so luong
    const updateSoluong = async (id:any, soluong:any, trangthai:any) => {
        try{
            await CartController.updateSoluong(id, soluong, trangthai)
        }catch(err){
            console.log(err);
        }
    }
    //update tong tien
    const updateTongTien = async (data:any) => {
        try{
            const reponse = await CartController.updateTongTien(data)
            setTongTien(reponse)
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getAllCart()
        updateTongTien(data)
    }, [data])

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
                            <TouchableOpacity style={{ padding: 1 }} onPress={() => updateSoluong( item.id, item.soluong, false ) }>
                                <Image source={require('../Image/minus.png')} style={{ width: 15, height: 15 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, marginLeft: 10, marginRight: 10, fontWeight: 'bold', color: 'white' }}>{item.soluong}</Text>
                            <TouchableOpacity style={{ padding: 1 }} onPress={() =>  updateSoluong( item.id, item.soluong, true )}>
                                <Image source={require('../Image/plus.png')} style={{ width: 15, height: 15 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={() => { deleteCartByid(item.id) }}>
                    <Text style={{ marginRight: 10, fontSize: 17, color: 'white', textDecorationLine: "underline" }}>Xóa</Text>
                </TouchableOpacity>
            </View>
        )
    }
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
        width: 100,
        justifyContent: 'space-between'
    },
    name_product: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    title_product: {
        fontSize: 15,
        color: 'white'
    },
    price_product: {
        fontSize: 19,
        color: 'green',
        fontWeight: 'bold',
    },

})