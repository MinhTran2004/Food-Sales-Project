import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { OderController } from "../Controller/OderController";
import axiosRetry from "axios-retry";
import { TypeOder } from "../Model/OderModel";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export default function OderActive({ navigation }: any) {
    const [data, setData] = useState<TypeOder[]>([]);
    const [magh, setMagh] = useState("")
    const [cart, setCart] = useState<any>([])

    const getAllOder = async () => {
        try {
            const reponse = await OderController.getAllOder()
            setData(reponse)
        } catch (err) {
            console.log(err);
        }
    }
    
    // const getAllCartById = async () => {
    //     try {
    //         const reponse = await OderController.getAllCartById(magh)
    //         setCart(reponse)
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    
    

    useEffect(() => {
        getAllOder()
    }, [data])

    const renderItem = ({ item }: any) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ padding: 10 }}>
                    <Image source={{ uri: item.anhsp }} style={[style.image_item, { height: 100, width: 100 }]} />
                </View>

                <View style={{ justifyContent: 'space-between' }}>
                    <View>
                        <Text style={style.text_name}>{item.tensp}</Text>
                        <Text style={style.text_title}>{item.giasp}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const vertiRender = ({ item }: any) => {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('Product')}>
                <View style={{ flex: 1, marginBottom: 20, backgroundColor: '#1f222a', borderRadius: 20 }}>

                    <FlatList
                        data={item.cart}
                        renderItem={renderItem} />

                    <View style={{ height: 1, backgroundColor: '#5d5d5d', marginTop: 10 }}></View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 15 }} >
                        <TouchableOpacity style={{ borderWidth: 1, borderColor: '#1bac4b', width: '45%', padding: 10, borderRadius: 20, marginTop: 15 }}>
                            <Text style={{ color: '#1bac4b', textAlign: 'center' }}>Cancel Order</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ borderWidth: 1, backgroundColor: '#1bac4b', width: '45%', padding: 10, borderRadius: 20, marginTop: 15 }}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Track Driver</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#181a20', padding: 10 }}>
            <FlatList
                data={data}
                renderItem={vertiRender}
                style={{ marginTop: 20 }} />

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
        resizeMode: 'cover',
    },
    text_name: {
        color: 'white',
        fontSize: 22,
        marginLeft: 10
    },
    text_title: {
        color: 'white',
        marginLeft: 10,
        fontSize: 14,
    },
    text_price: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        color: '#1bac4b',
        fontWeight: 'bold'
    },
})