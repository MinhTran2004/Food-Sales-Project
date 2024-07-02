import axios from "axios";
import axiosRetry from "axios-retry";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CartController } from "../Controller/CartController";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { ProductController } from "../Controller/ProductController";
import { FavouriteController } from "../Controller/FavouriteController";
import { useFocusEffect } from "@react-navigation/native";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});


export default function Product({ navigation, route }: any) {
    const [isFirstFocus, setIsFirstFocus] = useState(true);
    const [like, setLike] = useState(false)
    const { product } = route.params;

    const user = useSelector((state: any) => state.user.users[0].id);

    const addNewCart = async (data: any, makh: any) => {
        try {
            await CartController.addNewCart(data, makh)
            navigation.navigate("Cart")
        } catch (err) {
            console.log(err);
        }
    }
    //update yeu thich product
    const addNewFavourite = async () => {
        try {
            await FavouriteController.addNewFavourite(user, product.id)
            setLike(!like)
        } catch (err) {
            console.log(err);
        }
    }
    //delete yeu thich product
    const deleteFavouriteById = async () => {
        try {
            await FavouriteController.deleteFavouriteById(user, product.id)
            setLike(!like)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#1d1d21' }}>
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <View>
                    <Image source={{ uri: product.anhsp }} style={{ width: '100%', height: 300, resizeMode: 'cover' }} />
                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={styles.name}>{product.tensp}</Text>
                                <Text style={styles.price}>{product.giasp}</Text>
                            </View>
                            {like ?
                                <View>
                                    <TouchableOpacity onPress={() => { deleteFavouriteById() }}>
                                        <Image source={require("../Image/onlike.png")} style={styles.img_like} />
                                    </TouchableOpacity>
                                </View>
                                :
                                <View>
                                    <TouchableOpacity onPress={() => { addNewFavourite() }}>
                                        <Image source={require("../Image/offlike.png")} style={styles.img_like} />
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>

                        <Text style={styles.introduce}>Chào mừng bạn đến với thế giới của chúng tôi! Hãy thưởng thức hương vị đặc biệt của những chiếc hamburger tại đây. Với bánh mì giòn rụm, thịt bò tươi ngon và phong phú, chúng tôi cam kết mang đến cho bạn trải nghiệm ẩm thực đích thực. Đặt hàng ngay và khám phá hương vị độc đáo của chúng tôi!</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => { addNewCart(product, user) }}>
                    <Text style={styles.sell}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
            </View>

            <View style={{ position: 'absolute' }}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{ marginTop: 10, marginLeft: 10 }}>
                    <Image source={require("../Image/return.png")} style={{ height: 25, width: 25 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    price: {
        fontSize: 19,
        color: 'white'
    },
    introduce: {
        marginTop: 20,
        fontSize: 19,
        color: 'white'
    },
    button: {
        backgroundColor: '#4e85eb',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        padding: 10,
        borderRadius: 20,
    },
    sell: {
        fontSize: 20
    },
    img_like: {
        width: 30,
        height: 30,
        marginRight: 15,
    }
})