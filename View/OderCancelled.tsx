import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function OderCancelled({navigation}:any) {
    const [data, setData] = useState([]);

    //lấy sản phẩm theo thể loại
    const selectCategory = async () => {
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

    useEffect(() => {
        selectCategory();
    }, [])
    const vertiRender = ({ item }: any) => {
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
                                    <Text style={style.text_price}>${item.giasp}</Text>
                                    <View style = {{ padding: 5, borderRadius: 8, marginLeft: 10, borderWidth: 1, borderColor: '#f05454'}}>
                                        <Text style={{color: '#f05454', fontSize: 13}}>Cancalled</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
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