import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Cart({ navigation }: any) {
    const data = [
        { name: 'San pham', title: 'Hamberger', price: 2000, image: 'https://cdn.outsideonline.com/wp-content/uploads/2022/08/hiking-map-hamburger_h.jpg' },
        { name: 'San pham', title: 'Hamberger', price: 2300, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger_73989-4986.jpg?w=360' },
        { name: 'San pham', title: 'Hamberger', price: 2300, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger_73989-4986.jpg?w=360' },
        { name: 'San pham', title: 'Hamberger', price: 2000, image: 'https://cdn.outsideonline.com/wp-content/uploads/2022/08/hiking-map-hamburger_h.jpg' },
        { name: 'San pham', title: 'Hamberger', price: 2300, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger_73989-4986.jpg?w=360' },
        { name: 'San pham', title: 'Hamberger', price: 2300, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger_73989-4986.jpg?w=360' },
        
    ]

    const renderItem = ({ item }: any) => {
        return (
            <View style={style.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: item.image }} style={{ width: 90, height: 90, borderRadius: 10 }} />

                    <View style={style.layout_item}>
                        <View>
                            <Text style={style.name_product}>{item.name}</Text>
                            <Text style={style.title_product}>{item.title}</Text>
                        </View>
                        <Text style={style.price_product}>$ {item.price}</Text>
                    </View>

                    <View style={{ alignSelf: 'flex-end' }}>
                        <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: 30 }}>
                            <TouchableOpacity style={{ padding: 1 }}>
                                <Image source={require('../Image/plus.png')} style={{ width: 15, height: 15 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, marginLeft: 10, marginRight: 10, fontWeight: 'bold', color: 'white' }}>20</Text>
                            <TouchableOpacity style={{ padding: 1 }}>
                                <Image source={require('../Image/minus.png')} style={{ width: 15, height: 15 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity>
                    <Text style={{ marginRight: 10, fontSize: 17, color: 'white', textDecorationLine: "underline" }}>Xóa</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style = {{flex: 1, backgroundColor: '#1d1d21'}}>
            <ScrollView>
                <View style={{ flex: 1, padding: 5 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { navigation.navigate("Home") }} style={{ marginTop: 10, marginLeft: 10, marginBottom: 10 }}>
                            <Image source={require("../Image/return.png")} style={{ height: 25, width: 25, tintColor: 'white' }} />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, marginLeft: 20 }}>Cart</Text>
                    </View>

                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        scrollEnabled={false} />
                </View>
            </ScrollView>

            <View style={{ padding: 10, backgroundColor: '#1f222a' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Tổng tiền: </Text>
                    <Text style={{ fontSize: 20, color: 'white' }}>20.000</Text>
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate("CheckOder") }} style={{ backgroundColor: 'green', padding: 10 }}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>Mua Hàng</Text>
                </TouchableOpacity>
            </View>

        </View>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        padding: 5,
        paddingLeft: 10,
        flexDirection: 'row',
        borderRadius: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1f222a'
    },
    tieude: {
        textAlign: 'center',
        fontSize: 23,
        color: 'black',
        fontWeight: 'bold'
    },
    layout_item: {
        marginLeft: 10,
        height: '100%',
        justifyContent: 'space-between'
    },
    name_product: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    title_product: {
        fontSize: 13,
        color: 'white'
    },
    price_product: {
        fontSize: 19,
        color: 'green',
        fontWeight: 'bold',
    },

})