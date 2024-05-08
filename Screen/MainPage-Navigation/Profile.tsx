import { Image, StyleSheet, Text, View } from "react-native";
import { resolver } from "../../metro.config";

export default function Profile() {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Image source={require('../Image/man.png')} style={styles.avatar} />
            </View>

            <Text style={{ textAlign: 'center', fontSize: 25, color: 'black', fontWeight: 'bold' }}>Trần Công Minh</Text>
            <Text style = {{textAlign: 'center', fontSize: 20}}>( Khách hàng )</Text>

            <View style ={{padding: 20}}>
                <Text style = {styles.text}>Thông tin cá nhân</Text>
                <Text style = {styles.text}>Lịch sử mua hàng</Text>
                <Text style = {styles.text}>Giới thiệu</Text>
                <Text style = {styles.text}>Thay đổi mật khẩu</Text>
                <Text style = {styles.text}>Đăng xuất</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        marginTop: 80,
        alignItems: 'center'
    },
    avatar: {
        height: 120,
        width: 120,
    },
    main: {

    },
    text:{
        color: 'black',
        fontSize: 25,
        marginBottom: 30
    }
})