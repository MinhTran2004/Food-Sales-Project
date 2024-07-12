import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { OderController } from "../Controller/OderController";
import axiosRetry from "axios-retry";
import { useSelector } from "react-redux";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export default function OderActive({ navigation }: any) {
    const [data, setData] = useState<any>([]);

    const user = useSelector((state: any) => state.user.users[0]);

    const getAllOder = async () => {
        try {
            const reponse = await OderController.getAllOderActive(user.id, user.chucvu)
            if ( reponse ){
                setData(reponse)
            }else{
                console.log("OderActive null data");
            }
        } catch (err) {
            console.log(err);
        }
    }
    const updateStatusOder = async (id: any, status: any, makh: any) => {
        try {
            const reponse = await OderController.updateStatusOder(id, status, makh, user.chucvu)
            setData(reponse)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllOder()
    }, [data])

    const renderItem = ({ item }: any) => {
        return (
            item.anhsp ?
                <View style={{ flexDirection: 'row', flex: 1, padding: 10 }}>
                    <View>
                        <Image source={{ uri: item.anhsp }} style={[style.image_item, { height: 100, width: 100 }]} />
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ justifyContent: 'space-between' }}>
                            <Text style={style.text_name}>{item.tensp}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={style.text_giasp}>${Number(item.giasp).toLocaleString('vi-VN')}</Text>
                                <View style={{ backgroundColor: '#1bac4b', padding: 5, borderRadius: 8, marginLeft: 10 }}>
                                    <Text style={{ color: 'white', fontSize: 13, paddingLeft: 5, paddingRight: 5 }}>Paid</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: "center" }}>
                            <Text style={{ color: 'white', fontSize: 18 }}>X{item.soluong}</Text>
                        </View>
                    </View>
                </View>
                :
                <View></View>
        )
    }

    const vertiRender = ({ item }: any) => {
        return (
            item.cart.anhsp ?
                <View></View>
                :
                <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('Product')}>
                    <View style={{ flex: 1, marginBottom: 20, backgroundColor: '#1f222a', borderRadius: 20 }}>

                        <FlatList
                            data={item.cart}
                            renderItem={renderItem} 
                            keyExtractor={index => index.id}/>

                        <View style={{ height: 1, backgroundColor: '#5d5d5d' }}></View>

                        <Text style={{ color: 'white', textAlign: 'right', fontSize: 18, paddingRight: 15, marginTop: 10 }}>Tổng tiền: {item.tongtien}</Text>

                        {user.chucvu === "admin" ?
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 15 }}>
                                <TouchableOpacity style={style.btn_checkOder} onPress={() => { updateStatusOder(item.id, "Cancel", user.id) }}>
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Cancel Order</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.btn_checkOder} onPress={() => { updateStatusOder(item.id, "Completed", user.id) }}>
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Track Driver</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View></View>
                        }
                    </View>
                </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#181a20', padding: 10 }}>
            <FlatList
                data={data}
                renderItem={vertiRender}
                style={{ marginTop: 20 }}
                keyExtractor={ index => index.id} />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        borderRadius: 15,
        backgroundColor: '#ffffff',
    },
    image_item: {
        width: 160,
        height: 150,
        borderRadius: 25,
        resizeMode: 'stretch',
    },
    text_name: {
        color: 'white',
        fontSize: 22,
        marginLeft: 10
    },
    text_giasp: {
        color: '#1b9f47',
        marginLeft: 15,
        fontSize: 19,
        fontWeight: 'bold'
    },
    text_price: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        color: '#1bac4b',
        fontWeight: 'bold'
    },
    btn_checkOder: {
        borderWidth: 1,
        backgroundColor: '#1bac4b',
        width: '45%',
        padding: 10,
        borderRadius: 20,
        marginTop: 15
    }
})