import axios from "axios";
import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";

interface Product {
    tensp: string;
    giasp: number;
    anhsp: string;
    theloai: string;
    yeuthich: boolean;
    id: number;
}

export default function Sreach({ navigation }: any) {
    const [keyWord, setKeyWord] = useState("")
    const [data, setData] = useState();

    // lay thong tin san pham sang man hinh
    const getProduct = (item: any): Product => {
        return {
            tensp: item.tensp,
            giasp: item.giasp,
            anhsp: item.anhsp,
            theloai: item.theloai,
            yeuthich: item.yeuthich,
            id: item.id
        }
    }

    const getProductBySreach = async (keyWords: any) => {
        try {
            const reponse = await axios.get(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Product`, { params: { tensp: keyWords } });
            setData(reponse.data);
        } catch (err) {
            console.log(err);
        }
    }

    const vertiRender = ({ item }: any) => {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('Product', { product: getProduct(item) })}>
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
                    <TextInput placeholder="Bạn đang cần tìm gì ?" placeholderTextColor={'white'} style={{ marginLeft: 10, color: 'white' }} onChangeText={text => setKeyWord(text)} />
                </View>

                <TouchableOpacity onPress={() => { getProductBySreach(keyWord) }} style = {{padding: 10, backgroundColor: '#454545', borderRadius: 10, justifyContent: 'center'}}>
                    <Text style={{color: 'white', textAlign: 'center'}}>Tìm kiếm</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={data}
                renderItem={vertiRender} />
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