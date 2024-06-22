import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Favourite({ navigation }: any) {
    const [data, setData] = useState([]);

    //lấy tất cả sản phẩm
    const getData = async () => {
        try {
            const reponse = await axios.get(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Product?yeuthich=true`)
            setData(reponse.data)
        } catch (err) {
            console.log(err);
        }
    }

    //Update yêu thích sản phẩm
    const updateLikeProduct = async (id: any, yeuthich: any) => {
        try {
            const reponse = await axios.put(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Product/${id}`, { yeuthich: !yeuthich });
            getData();
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getData();
    }, [])


    const vertiRender = ({ item }: any) => {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('Product')}>
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

                        {item.yeuthich ?
                            <TouchableOpacity onPress={() => { updateLikeProduct(item.id, item.yeuthich) }} style={{ justifyContent: 'flex-end', marginBottom: 10 }}>
                                <Image source={require("../Image/onlike.png")} style={style.img_like} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { updateLikeProduct(item.id, item.yeuthich) }} style={{ justifyContent: 'flex-end', marginBottom: 10 }}>
                                <Image source={require("../Image/offlike.png")} style={style.img_like} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#1d1d21', padding: 10 }}>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                            <Image source={require("../Image/return.png")} style={{ height: 25, width: 25, tintColor: 'white' }} />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold', marginLeft: 10 }}>My Favourite Restaurants</Text>
                    </View>

                    <Image source={require("../Image/sreach.png")} style={{ width: 20, height: 20, tintColor: 'white' }} />

                </View>

                <FlatList
                    data={data}
                    renderItem={vertiRender}
                    showsVerticalScrollIndicator={false} />
            </View>
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
    img_like: {
        width: 23,
        height: 23,
        marginRight: 15,
    }
})