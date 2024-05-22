import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Oder() {
    const data = [{ name: 'minh' }]
    const renderItem = ({ item }: any) => {
        const listFood = [
            { name: 'San pham', title: 'Hamberger', price: 2000, image: 'https://cdn.outsideonline.com/wp-content/uploads/2022/08/hiking-map-hamburger_h.jpg' },
            { name: 'San pham', title: 'Hamberger', price: 2300, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger_73989-4986.jpg?w=360' },
            { name: 'San pham', title: 'Hamberger', price: 2500, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger-with-beef_73989-4636.jpg' },
            { name: 'San pham', title: 'Hamberger', price: 2700, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger-with-beef_73989-4992.jpg' },
            { name: 'San pham', title: 'Hamberger', price: 2000, image: 'https://cdn.outsideonline.com/wp-content/uploads/2022/08/hiking-map-hamburger_h.jpg' },
            { name: 'San pham', title: 'Hamberger', price: 2300, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger_73989-4986.jpg?w=360' },
            { name: 'San pham', title: 'Hamberger', price: 2500, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger-with-beef_73989-4636.jpg' },
            { name: 'San pham', title: 'Hamberger', price: 2700, image: 'https://img.freepik.com/premium-photo/tasty-grilled-homemade-burger-with-beef_73989-4992.jpg' },
        ]

        const renderListFood = ({ item }: any) => {
            return (
                <View>
                    <Image source={{ uri: item.image }} style={{ height: 100, width: 100, marginRight: 10 }} />
                    <Text style = {{color: 'black', fontWeight: 'bold'}}>Hambuger</Text>
                    <Text>20.000</Text>
                </View>
            )
        }
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.title}>Tên khách hàng: </Text>
                    <Text style={styles.content}>Trần Công Minh</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Địa chỉ: </Text>
                    <Text style={styles.content}>Thị trấn khoái châu - Hưng Yên</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Tên cửa hàng: </Text>
                    <Text style={styles.content}>HanoiFood</Text>
                </View>

                <Text style = {[styles.content, {marginBottom: 5}]}>Danh sách sản phẩm</Text>

                <FlatList
                    data={listFood}
                    renderItem={renderListFood}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false} />

                <View style={styles.layout_tongtien}>
                    <Text style={styles.title}>Tổng tiền </Text>
                    <Text style={styles.tongtien}>120.000</Text>
                </View>
                {/* <TouchableOpacity style = {styles.layout_btn}>
                    <Text>Xóa</Text>
                </TouchableOpacity> */}
            </View>
        )
    }


    return (
        <View style={{ flex: 1, padding: 5 }}>
            <FlatList
                data={data}
                renderItem={renderItem} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    layout_tongtien:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 17,
        color: 'black',
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 10,
        marginBottom: 10,
        borderTopWidth: 0.5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    tongtien:{
        fontSize: 20,
        color: 'black',
        textAlignVertical: 'bottom'
    },
    content: {
        fontSize: 17,
        color: 'black',
        textAlignVertical: 'bottom'
    },
    layout_btn:{
        width: 80,
        padding: 10,
        alignSelf: 'flex-end',
        backgroundColor: '#6cabfe',
        borderRadius: 5,
        alignItems: 'center'
    }
})