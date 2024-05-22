import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { resolver } from "../../metro.config";

export default function Profile() {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
            </View>

            <Image source={require('../Image/man.png')} style={styles.avatar} />

            <Text style={{ textAlign: 'center', fontSize: 25, color: 'black', fontWeight: 'bold' }}>Trần Công Minh</Text>
            <Text style = {{textAlign: 'center', fontSize: 20}}>( Khách hàng )</Text>

            <View style ={{padding: 20}}>
                <TouchableOpacity><Text style = {styles.text}>Thông tin cá nhân</Text></TouchableOpacity>
                <TouchableOpacity><Text style = {styles.text}>Lịch sử mua hàng</Text></TouchableOpacity>
                <TouchableOpacity><Text style = {styles.text}>Danh sách yêu thích</Text></TouchableOpacity>
                <TouchableOpacity><Text style = {styles.text}>Giới thiệu</Text></TouchableOpacity>
                <TouchableOpacity><Text style = {styles.text}>Thay đổi mật khẩu</Text></TouchableOpacity>
                <TouchableOpacity><Text style = {styles.text}>Đăng xuất</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 120,
        alignItems: 'center',
        backgroundColor: '#0974e8',
        position: 'absolute'
    },
    avatar: {
        height: 120,
        width: 120,
        alignSelf: 'center',
        marginTop: 50
    },

    text:{
        color: 'black',
        fontSize: 25,
        marginBottom: 20
    }
})