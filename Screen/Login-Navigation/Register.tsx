import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Register({ navigation }: any) {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
            <Image source={require('../Image/logo.png')} style={style.logo} />

            <View style={style.layout}>
                <Image source={require("../Image/account.png")} style={style.icon_input} />
                <TextInput style={style.input} placeholder="Username" />
            </View>
            <Text style= {style.error}>Không để trống ô nhập</Text>

            <View style={style.layout}>
                <Image source={require("../Image/mail.png")} style={style.icon_input} />
                <TextInput style={style.input} placeholder="Email" />
            </View>
            <Text style= {style.error}>Không để trống ô nhập</Text>

            <View style={style.layout}>
                <Image source={require("../Image/lock.png")} style={style.icon_input} />
                <TextInput style={style.input} placeholder="Password" />
            </View>
            <Text style= {style.error}>Không để trống ô nhập</Text>

            <TouchableOpacity style={style.button} onPress={() => { navigation.navigate('Login') }}>
                <Text style={style.register}>Register</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', marginTop: 70 }}>
                <View style={style.line}></View>
                <Text style={style.or}>OR</Text>
                <View style={style.line}></View>
            </View>

            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 60 }}>
                <Image source={require('../Image/gmail.png')} style={style.icon_login} />
                <Image source={require('../Image/facebook.png')} style={[style.icon_login, { marginLeft: 50, marginRight: 50 }]} />
                <Image source={require('../Image/twitter.png')} style={style.icon_login} />
            </View>

        </View>
    )
}

const style = StyleSheet.create({
    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 80
    },
    layout: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 25,
    },
    icon_input: {
        height: 28,
        width: 28,
        marginLeft: 10,
        alignSelf: 'center'
    },
    input: {
        width: 300,
        marginLeft: 10,
        paddingLeft: 10,
        borderLeftWidth: 0.5,
    },
    error: {
        color: 'red',
        textAlign: 'right',
        marginBottom: 5,
        fontWeight: 'bold'
    },
    button: {
        width: '100%',
        backgroundColor: 'red',
        padding: 10,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 25
    },
    register: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18
    },
    line: {
        width: '46%',
        backgroundColor: '#7c7b7c',
        height: 2,
        alignSelf: 'center'
    },
    or: {
        marginLeft: 5,
        marginRight: 5,
        fontSize: 18
    },
    icon_login: {
        height: 45,
        width: 45,
    }
})