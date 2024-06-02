import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";

export default function Product({ navigation }: any) {
    return (
        <View style={{ flex: 1, backgroundColor: '#1d1d21' }}>
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <View>
                    <Image source={{ uri: 'https://cdn.outsideonline.com/wp-content/uploads/2022/08/hiking-map-hamburger_h.jpg' }} style={{ width: '100%', height: 300, resizeMode: 'cover' }} />
                    <View style={styles.container}>
                        <Text style={styles.name}>Hambuger 2 trứng</Text>
                        <Text style={styles.price}>20.000</Text>
                        <Text style={styles.introduce}>Chào mừng bạn đến với thế giới của chúng tôi! Hãy thưởng thức hương vị đặc biệt của những chiếc hamburger tại đây. Với bánh mì giòn rụm, thịt bò tươi ngon và phong phú, chúng tôi cam kết mang đến cho bạn trải nghiệm ẩm thực đích thực. Đặt hàng ngay và khám phá hương vị độc đáo của chúng tôi!</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button}>
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
    }
})