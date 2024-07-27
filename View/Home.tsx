import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ProductController } from "../Controller/ProductController";
import axiosRetry from "axios-retry";
import { useSelector } from "react-redux";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export default function Home({ navigation, route }: any) {
    const [data, setData] = useState<any[]>([]);
    const [dataCategory, setDataCategory] = useState<any[]>([]);
    const [nameCategory, setnameCategory] = useState("");
    const [loading, setLoading] = useState(true);

    const users = useSelector((state: any) => state.user.users[0]);

    //lấy tất cả sản phẩm
    const getAllProduct = async () => {
        try {
            const product = route.params;
            const reponse = Object.values(product)
            setData(reponse)
            setDataCategory(reponse)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const getProductCategory = (name: any) => {
        setnameCategory(name);
        if (name === "All") {
            setDataCategory(data);
        }else{
            const arrProductCategory = data.filter(product => product.theloai === nameCategory);
            setDataCategory(arrProductCategory);
        }
    }

    useEffect(() => {
        getAllProduct()
    }, [users])

    useEffect(() => {
        getProductCategory(nameCategory)
    }, [nameCategory])

    const Product_item = ({ image, name }: any) => {
        return (
            <View style={{ width: '25%', alignItems: 'center' }}>
                <Image source={image} style={{ width: 50, height: 50 }} />
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>{name}</Text>
            </View>
        )
    }
    const data_category = [
        { name: 'All' },
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
            <TouchableOpacity onPress={() => { getProductCategory(item.name) }}>
                <View style={style.layout_hozi}>
                    <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const horiRender = ({ item }: any) => {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('Product', { product: item })}>
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
                                <Text style={style.text_luotmua}>Đã bán {item.luotmua}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const vertiRender = ({ item }: any) => {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('Product', { product: item })}>
                <View style={{ flex: 1, marginBottom: 10 }}>
                    <View style={[style.container, { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1f222a' }]}>

                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ padding: 10 }}>
                                <Image source={{ uri: item.anhsp }} style={[style.image_item, { height: 100, width: 100 }]} />
                            </View>

                            <View style={{ justifyContent: 'space-between', flex: 1 }}>
                                <View>
                                    <Text style={style.text_name}>{item.tensp}</Text>
                                    <Text style={style.text_title}>{item.theloai}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={style.text_price}>${item.giasp}</Text>
                                    <Text style={style.text_luotmua}>Đã bán {item.luotmua}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#1d1d21' }}>
            {loading ?
                (<View style={{ flex: 1, backgroundColor: '#1d1d21', alignItems: 'center', justifyContent: "center" }} >
                    <ActivityIndicator size="large" color="#0000ff" />
                </View >)
                :
                (
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ flex: 1, backgroundColor: '#1d1d21', padding: 10 }}>
                            {/* header  */}
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Image source={require('../Image/man.png')} style={{ width: 50, height: 50 }} />
                                        <View style={{ justifyContent: 'space-between', marginLeft: 10 }}>
                                            <View>
                                                <Text style={[style.title, { color: 'white' }]}>{users.ten}</Text>
                                                <Text style={{ fontSize: 16, color: 'white' }}>{users.chucvu}</Text>
                                            </View>
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
                                <Image source={require('../Image/img_product_home.png')} style={style.image_header} />
                            </View>

                            {/* main */}
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <Product_item image={require('../Image/hamburger.png')} name="Hambuger" />
                                <Product_item image={require('../Image/pizza.png')} name="Pizza" />
                                <Product_item image={require('../Image/noodles.png')} name="Noodles" />
                                <Product_item image={require('../Image/meat.png')} name="More" />
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <Product_item image={require('../Image/vegetable.png')} name="Vegetable" />
                                <Product_item image={require('../Image/cake.png')} name="Dessert" />
                                <Product_item image={require('../Image/drink.png')} name="Drink" />
                                <Product_item image={require('../Image/more.png')} name="More" />
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
                                data={dataCategory}
                                renderItem={vertiRender} />
                        </View>
                    </ScrollView>
                )
            }
        </View>
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
    text_luotmua: {
        fontSize: 15,
        color: 'white',
        paddingRight: 10,
        alignSelf: 'center'
    },
    img_like: {
        width: 23,
        height: 23,
        marginRight: 15,
    }
})