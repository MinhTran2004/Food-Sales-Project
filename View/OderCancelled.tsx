import axios from "axios";
import axiosRetry from "axios-retry";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { OderController } from "../Controller/OderController";
import { useSelector } from "react-redux";

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.response?.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export default function OderCancelled({ navigation }: any) {
    const [data, setData] = useState<any>([]);

    const user = useSelector((state: any) => state.user.users[0].id);

    //lấy tất cả danh sách có trạng thái = "Cancel"
    const getAllOderCancel = async () => {
        try {
            const reponse = await OderController.getAllOderCancel(user)
            setData(reponse)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllOderCancel();
    }, [data])

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('Product')}>
                <View style={{ flex: 1, marginBottom: 20 }}>
                    <View style={[style.container, { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1f222a' }]}>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ padding: 10 }}>
                                <Image source={{ uri: item.anhsp }} style={[style.image_item, { height: 100, width: 100 }]} />
                            </View>

                            <View style={{ justifyContent: 'space-between', paddingBottom: 5, paddingTop: 5 }}>
                                <View>
                                    <Text style={style.text_name}>{item.tensp}</Text>
                                    <Text style={style.text_title}>{item.theloai}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={style.text_giasp}>${Number(item.giasp).toLocaleString('vi-VN')}</Text>
                                    <View style={{ padding: 5, borderRadius: 8, marginLeft: 10, borderWidth: 1, borderColor: '#f05454' }}>
                                        <Text style={{ color: '#f05454', fontSize: 13 }}>Cancalled</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const vertiRender = ({ item }: any) => {
        return (
            <View>
                <FlatList
                    data={item.cart}
                    renderItem={renderItem} />
            </View>
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