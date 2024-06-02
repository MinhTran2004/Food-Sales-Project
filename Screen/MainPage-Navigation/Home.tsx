import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";

export default function Home({ navigation }: any) {
    const [data, setData] = useState([]);
    const [theloai, setTheLoai] = useState([]);

    //lấy tất cả sản phẩm
    const getData = async () => {
        try {
            await axios.get(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Product?yeuthich=false`)
                .then((reponse) => { setData(reponse.data), setTheLoai(reponse.data) })
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
            const reponse = await axios.get(`https://65d5e0fcf6967ba8e3bcd759.mockapi.io/api/Product`, {
                params: {
                    yeuthich: false,
                    theloai: category
                }
            })
                .then((reponse) => { setTheLoai(reponse.data) })
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
        { name: 'All', image: '' },
        { name: 'Hambuger' },
        { name: 'Pizza' },
        { name: 'Noodles' },
        { name: 'Meat' },
        { name: 'Vegetable' },
        { name: 'Dessert' },
        { name: 'Drink' },
        { name: 'More' }
    ]
    const renderCategory = ({ item }: any) => {
        return (
            <TouchableOpacity onPress={() => { selectCategory(item.name) }}>
                <View style={style.layout_hozi}>
                    <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const horiRender = ({ item }: any) => {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('Product')}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <View style={[style.container, { backgroundColor: '#1f222a' }]}>
                        <View style={{ padding: 10 }}>
                            <Image source={{ uri: item.anhsp }} style={style.image_item} />
                        </View>
                        <View>
                            <Text style={style.text_name}>{item.tensp}</Text>
                            <Text style={style.text_title}>{item.theloai}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={style.text_price}>${item.giasp}</Text>

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
        <ScrollView>
            <View style={{ flex: 1, backgroundColor: '#1d1d21', padding: 10 }}>

                {/* header  */}
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Image source={require('../Image/man.png')} style={{ width: 50, height: 50 }} />
                            <View style={{ justifyContent: 'space-between', marginLeft: 10 }}>
                                <Text style={{ fontSize: 17, color: 'white' }}>Khách hàng</Text>
                                <Text style={[style.title, { color: 'white' }]}>Trần Công Minh</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={[style.image_icon, { marginRight: 10 }]}>
                                <Image source={require("../Image/notification.png")} style={{ width: 20, height: 20, tintColor: 'white' }} />
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={style.image_icon} >
                                <Image source={require("../Image/cart.png")} style={{ width: 20, height: 20, tintColor: 'white' }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={style.layout_sreach}>
                        <Image source={require("../Image/sreach.png")} style={{ width: 20, height: 20, tintColor: 'white' }} />
                        <TextInput placeholder="Bạn đang cần tìm gì ?" placeholderTextColor={'white'} style={{ marginLeft: 10 }} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <Text style={[style.title, { color: 'white' }]}>Special Offer</Text>
                        <Text style={[style.title, { fontSize: 15, color: 'green' }]}>See All</Text>
                    </View>
                    <Image source={{ uri: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger-with-beef_73989-4636.jpg' }} style={style.image_header} />
                </View>

                {/* main */}
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ width: '25%', alignItems: 'center' }}>
                        <Image source={require("../Image/hamburger.png")} style={{ width: 50, height: 50 }} />
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>Hambuger</Text>
                    </View>
                    <View style={{ width: '25%', alignItems: 'center' }}>
                        <Image source={require("../Image/pizza.png")} style={{ width: 50, height: 50 }} />
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>Pizza</Text>
                    </View>
                    <View style={{ width: '25%', alignItems: 'center' }}>
                        <Image source={require("../Image/noodles.png")} style={{ width: 50, height: 50 }} />
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>Noodles</Text>
                    </View>
                    <View style={{ width: '25%', alignItems: 'center' }}>
                        <Image source={require("../Image/meat.png")} style={{ width: 50, height: 50 }} />
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>Meat</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ width: '25%', alignItems: 'center' }}>
                        <Image source={require("../Image/vegetable.png")} style={{ width: 50, height: 50 }} />
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>Vegetable</Text>
                    </View>
                    <View style={{ width: '25%', alignItems: 'center' }}>
                        <Image source={require("../Image/cake.png")} style={{ width: 50, height: 50 }} />
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>Dessert</Text>
                    </View>
                    <View style={{ width: '25%', alignItems: 'center' }}>
                        <Image source={require("../Image/drink.png")} style={{ width: 50, height: 50 }} />
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>Drink</Text>
                    </View>
                    <View style={{ width: '25%', alignItems: 'center' }}>
                        <Image source={require("../Image/more.png")} style={{ width: 50, height: 50 }} />
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>More</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 30 }}>
                    <Text style={[style.title, { color: 'white' }]}>Discount guaranteed!</Text>
                    <Text style={[style.title, { fontSize: 15, color: 'green' }]}>See All</Text>
                </View>

                <FlatList
                    scrollEnabled={true}
                    data={data}
                    horizontal={true}
                    renderItem={horiRender} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
                    <Text style={[style.title, { color: 'white' }]}>Recommended For You</Text>
                    <Text style={[style.title, { fontSize: 15, color: 'green' }]}>See All</Text>
                </View>

                <FlatList
                    data={data_category}
                    renderItem={renderCategory}
                    horizontal={true}
                    style={{ marginTop: 30, marginBottom: 30 }}
                    showsHorizontalScrollIndicator={false}
                />
                <FlatList
                    scrollEnabled={false}
                    data={theloai}
                    renderItem={vertiRender} />
            </View>
        </ScrollView>

    )
}

const style = StyleSheet.create({
    image_icon: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        borderRadius: 25
    },
    title: {
        fontSize: 19,
        color: 'black',
        fontWeight: 'bold'
    },
    layout_sreach: {
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1f222a',
    },
    image_header: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 20
    },
    layout_hozi: {
        flexDirection: 'row',
        width: 90,
        borderWidth: 2,
        borderColor: 'green',
        borderRadius: 20,
        padding: 5,
        marginRight: 7,
        justifyContent: 'center'
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
    img_like: {
        width: 23,
        height: 23,
        marginRight: 15,
    }
})