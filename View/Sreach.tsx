import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ProductController } from "../Controller/ProductController";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export default function Sreach({ navigation }: any) {
    const [keyWord, setKeyWord] = useState("")
    const [data, setData] = useState<any>();

    const getProductBySreach = async (key: any) => {
        try{
            const reponse = await ProductController.getSreachAllProduct(key)
            setData(reponse)
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getProductBySreach(keyWord)
    }, [data])

    const vertiRender = ({ item }: any) => {
        return (
            <TouchableOpacity style={{ flex: 1 }}>
                <View style={{ flex: 1, marginBottom: 10 }}>
                    <View style={[style.container, { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1f222a' }]}>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ padding: 10 }}>
                                <Image source={{ uri: item.anhsp }} style={[style.image_item, { height: 100, width: 100 }]} />
                            </View>

                            <View style={{ justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={style.text_name}>{item.tensp}</Text>
                                    <Text style={style.text_title}>{item.theloai}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={style.text_price}>${item.giasp}</Text>

                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, padding: 5, backgroundColor: '#1d1d21' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={style.layout_sreach}>
                    <Image source={require("../Image/sreach.png")} style={{ width: 20, height: 20, tintColor: 'white' }} />
                    <TextInput placeholder="Nhập tên sản phẩm bạn cần tìm ?" placeholderTextColor={'white'} style={{ marginLeft: 10, color: 'white' }} onChangeText={text => setKeyWord(text)} />
                </View>

                <TouchableOpacity onPress={() => { getProductBySreach(keyWord) }} style = {{padding: 10, backgroundColor: '#454545', borderRadius: 10, justifyContent: 'center'}}>
                    <Text style={{color: 'white', textAlign: 'center'}}>Tìm kiếm</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={data}
                renderItem={vertiRender}
                style = {{marginTop: 10}} />
        </View>
    )
}

const style = StyleSheet.create({
    layout_sreach: {
        borderRadius: 15,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1f222a',
        width: '80%'
    },
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
        color: 'green',
        fontWeight: 'bold'
    },
})