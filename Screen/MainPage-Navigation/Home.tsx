import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";

export default function Home() {
    const data_category = [
        { name: 'All' }, { name: 'Hambuger' }, { name: 'Pizaa' }, { name: 'Noodles' }, { name: 'Cake' }, { name: 'Rice' }, { name: 'Dinks' }
    ]
    const img_header = [
        { name: 'San pham', title: 'Hamberger', price: 2000, image: 'https://cdn.outsideonline.com/wp-content/uploads/2022/08/hiking-map-hamburger_h.jpg' },
        { name: 'San pham', title: 'Hamberger', price: 2300, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger_73989-4986.jpg?w=360' },
        { name: 'San pham', title: 'Hamberger', price: 2500, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger-with-beef_73989-4636.jpg' },
        { name: 'San pham', title: 'Hamberger', price: 2700, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger-with-beef_73989-4992.jpg' },
        { name: 'San pham', title: 'Hamberger', price: 2000, image: 'https://cdn.outsideonline.com/wp-content/uploads/2022/08/hiking-map-hamburger_h.jpg' },
        { name: 'San pham', title: 'Hamberger', price: 2300, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger_73989-4986.jpg?w=360' },
        { name: 'San pham', title: 'Hamberger', price: 2500, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger-with-beef_73989-4636.jpg' },
        { name: 'San pham', title: 'Hamberger', price: 2700, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger-with-beef_73989-4992.jpg' },
    ]
    const renderCategory = ({ item }: any) => {
        return (
            <View style={style.layout_hozi}>
                <TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const renderFood = ({ item }: any) => {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={style.container}>
                    <Image source={{ uri: item.image }} style={style.image_item} />
                    <View>
                        <Text style={style.text_name}>{item.name}</Text>
                        <Text style={style.text_title}>{item.title}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[style.text_price, { color: '#f43127' }]}>$</Text>
                            <Text style={style.text_price}>{item.price}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <ScrollView>
            <View style={{ flex: 1, padding: 5, backgroundColor: '#f2f2f2' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
                    <Text style={{ color: 'black', fontSize: 23, fontWeight: 'bold' }}>Hello Minh</Text>
                    <Image source={require('../Image/cart.png')} style={{ height: 25, width: 25 }} />
                </View>

                <View style={{ borderRadius: 25, borderWidth: 1, marginBottom: 10 }}>
                    <TextInput placeholder="Nhập tên sản phẩm cần tìm" style={{ paddingLeft: 15 }} />
                </View>

                <Image source={{ uri: img_header[2].image }} style={style.image_header} />

                <FlatList
                    data={data_category}
                    renderItem={renderCategory}
                    horizontal={true}
                    style={{ marginTop: 15, marginBottom: 15 }}
                    showsHorizontalScrollIndicator={false}
                />
                {/* <Text style={style.text_category}>Recommend</Text> */}

                <FlatList
                    scrollEnabled={false}
                    numColumns={2}
                    data={img_header}
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
        marginRight: 10
    },
    container: {
        width: '92%',
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: '#ffffff'
    },
    image_item: {
        width: '100%',
        height: 140,
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
    }
})