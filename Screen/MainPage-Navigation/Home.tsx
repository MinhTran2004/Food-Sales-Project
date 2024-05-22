import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";

export default function Home({ navigation }: any) {
    const [data, setData] = useState([]);

    //lấy tất cả sản phẩm
    const getData = async () => {
        try {
            await axios.get(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Product`)
                .then((reponse) => { setData(reponse.data) })
                .catch((err) => {
                    console.log(err);
                })
        } catch (err) {
            console.log(err);
        }
    }

    //lấy sản phẩm theo thể loại
    const selectCategory = async (category: any) => {
        try {
            const reponse = await axios.get(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Product?theloai=${category}`)
                .then((reponse) => { setData(reponse.data) })
                .catch((err) => {
                    console.log(err);
                })
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

    const data_category = [
        { name: 'All' }, { name: 'Hambuger' }, { name: 'Pizza' }, { name: 'Noodles' }, { name: 'Cake' }, { name: 'Rice' }, { name: 'Dinks' }
    ]
    const renderCategory = ({ item }: any) => {

        return (
            <TouchableOpacity onPress={() => { selectCategory(item.name); console.log(data); }}>
                <View style={style.layout_hozi}>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>{item.name}</Text>
                </View>
            </TouchableOpacity>

        )
    }
    const renderFood = ({ item }: any) => {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('Product')}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={style.container}>
                        <Image source={{ uri: item.anhsp }} style={style.image_item} />
                        <View>
                            <Text style={style.text_name}>{item.tensp}</Text>
                            <Text style={style.text_title}>{item.theloai}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[style.text_price, { color: '#f43127' }]}>$</Text>
                                    <Text style={style.text_price}>{item.giasp}</Text>
                                </View>

                                {item.yeuthich ?
                                    <TouchableOpacity onPress={() => { updateLikeProduct(item.id, item.yeuthich) }}>
                                        <Image source={require("../Image/onlike.png")} style={style.img_like} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => { updateLikeProduct(item.id, item.yeuthich) }}>
                                        <Image source={require("../Image/offlike.png")} style={style.img_like} />
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView>
            <View style={{ flex: 1, padding: 5, backgroundColor: '#f2f2f2' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                    <Text style={{ color: 'black', fontSize: 23, fontWeight: 'bold' }}>Hello Minh</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <Image source={require('../Image/cart.png')} style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>
                </View>

                <Image source={{ uri: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger-with-beef_73989-4636.jpg' }} style={style.image_header} />

                <FlatList
                    data={data_category}
                    renderItem={renderCategory}
                    horizontal={true}
                    style={{ marginTop: 15, marginBottom: 15 }}
                    showsHorizontalScrollIndicator={false}
                />

                <FlatList
                    scrollEnabled={false}
                    numColumns={2}
                    data={data}
                    renderItem={renderFood} />
            </View>
        </ScrollView>

    )
}

const style = StyleSheet.create({
    image_header: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 20
    },
    layout_hozi: {
        width: 90,
        borderWidth: 2,
        alignItems: 'center',
        borderRadius: 20,
        padding: 5,
        marginRight: 7
    },
    container: {
        width: '95%',
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: '#ffffff'
    },
    image_item: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    text_name: {
        color: 'black',
        fontSize: 22,
        marginTop: 5,
        marginLeft: 10
    },
    text_title: {
        marginLeft: 10,
        fontSize: 14,
    },
    text_price: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10
    },
    img_like: {
        width: 23,
        height: 23,
        marginRight: 15,
    }
})