import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Cart() {
    const data = [
        { name: 'San pham', title: 'Hamberger', price: 2000, image: 'https://cdn.outsideonline.com/wp-content/uploads/2022/08/hiking-map-hamburger_h.jpg' },
        { name: 'San pham', title: 'Hamberger', price: 2300, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger_73989-4986.jpg?w=360' },
        { name: 'San pham', title: 'Hamberger', price: 2500, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger-with-beef_73989-4636.jpg' },
        { name: 'San pham', title: 'Hamberger', price: 2700, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger-with-beef_73989-4992.jpg' },
        { name: 'San pham', title: 'Hamberger', price: 2000, image: 'https://cdn.outsideonline.com/wp-content/uploads/2022/08/hiking-map-hamburger_h.jpg' },
        { name: 'San pham', title: 'Hamberger', price: 2300, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger_73989-4986.jpg?w=360' },
        { name: 'San pham', title: 'Hamberger', price: 2500, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger-with-beef_73989-4636.jpg' },
        { name: 'San pham', title: 'Hamberger', price: 2700, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger-with-beef_73989-4992.jpg' },
    ]

    const renderItem = ({ item }: any) => {
        return (
            <View style={style.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: item.image }} style={{ width: 100, height: 100, borderRadius: 10 }} />

                    <View style={style.layout_item}>
                        <Text style={style.name_product}>{item.name}</Text>
                        <Text style={style.title_product}>{item.title}</Text>
                        <Text style={style.price_product}>$ {item.price}</Text>
                    </View>

                    <View style={{ alignSelf: 'flex-end' }}>
                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                            <TouchableOpacity style={{  padding: 1 }}>
                                <Image source={require('../Image/plus.png')} style={{ width: 15, height: 15 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, marginLeft: 10, marginRight: 10 }}>20</Text>
                            <TouchableOpacity style={{  padding: 1 }}> 
                                <Image source={require('../Image/minus.png')} style={{ width: 15, height: 15 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity>
                    <Image source={require('../Image/delete.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={renderItem} />
            <View style= {{padding: 10}}>
                <View style = {{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10}}>
                    <Text style = {{fontSize: 20, fontWeight: 'bold', color: 'black'}}>Tổng tiền: </Text>
                    <Text style = {{fontSize: 20, color: 'black'}}>20.000</Text>
                </View>
                <TouchableOpacity style = {{backgroundColor: '#c32003', padding: 10}}>
                    <Text style= {{textAlign: 'center', color:'white'}}>Mua Hàng</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tieude: {
        textAlign: 'center',
        fontSize: 23,
        color: 'black',
        fontWeight: 'bold'
    },
    layout_item: {
        marginLeft: 10
    },
    name_product: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    title_product: {
        fontSize: 13,
    },
    price_product: {
        fontSize: 15,
            
        color: 'red',
        fontWeight: 'bold',
        alignContent: 'flex-end'
    },
    price:{
        
    }




})