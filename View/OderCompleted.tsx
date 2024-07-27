import axios from "axios";
import axiosRetry from "axios-retry";
import React, {  useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { OderController } from "../Controller/OderController";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export default function OderCompleted({ navigation }: any) {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(true);

    const user = useSelector((state: any) => state.user.users[0]);

    //lấy tất cả danh sách có trạng thái = "Completed"
    const getAllOderCompleted = async () => {
        try {
            const reponse = await OderController.getAllOderCompleted(user.id, user.chucvu)
            if (reponse) {
                setData(reponse)
            } else {
                console.log("Oder completed null data");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    useFocusEffect(() => {
        useCallback(() => {
            getAllOderCompleted()
        }, [])
    });
    
    const renderItem = ({ item }: any) => {
        return (
            item.anhsp ? (
                <View style={{ flexDirection: 'row', flex: 1, padding: 10, backgroundColor: "#1f222a" }}>
                    <View>
                        <Image source={{ uri: item.anhsp }} style={[style.image_item, { height: 100, width: 100 }]} />
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ justifyContent: 'space-between' }}>
                            <Text style={style.text_name}>{item.tensp}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={style.text_giasp}>{Number(item.giasp).toLocaleString('vi-VN')}</Text>
                                <View style={{ backgroundColor: '#1bac4b', padding: 5, borderRadius: 8, marginLeft: 10 }}>
                                    <Text style={{ color: 'white', fontSize: 13 }}>Completed</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: "center" }}>
                            <Text style={{ color: 'white', fontSize: 18 }}>X{item.soluong}</Text>
                        </View>
                    </View>
                </View>
            ) : (
                <View></View>
            )
        );
    }


    const vertiRender = ({ item }: any) => {
        return (
            <View style={{ flex: 1, marginBottom: 20, backgroundColor: "#1f222a" }}>
                <FlatList
                    data={item.cart}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()} />

                <View style={{ height: 1, backgroundColor: '#5d5d5d', marginTop: 10 }}></View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 15 }} >
                    <TouchableOpacity style={{ borderWidth: 1, borderColor: '#1bac4b', width: '45%', padding: 10, borderRadius: 20, marginTop: 15 }}>
                        <Text style={{ color: '#1bac4b', textAlign: 'center' }}>Leave a Review</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderWidth: 1, backgroundColor: '#1bac4b', width: '45%', padding: 10, borderRadius: 20, marginTop: 15 }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Oder Again</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#1d1d21' }}>
            {loading ?
                (<View style={{ flex: 1, backgroundColor: '#1d1d21', alignItems: 'center', justifyContent: "center" }} >
                    <ActivityIndicator size="large" color="#0000ff" />
                </View >)
                :
                (<View style={{ flex: 1, backgroundColor: '#181a20', padding: 10 }}>
                    <FlatList
                        data={data}
                        renderItem={vertiRender}
                        style={{ marginTop: 20 }}
                        keyExtractor={(item, index) => index.toString()} />
                </View>)
            }
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
    text_giasp: {
        color: '#1b9f47',
        marginLeft: 15,
        fontSize: 19,
        fontWeight: 'bold'
    },
})