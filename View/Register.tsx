import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Register({ navigation }: any) {
    return (
        <View style={{ flex: 1, backgroundColor: '#181a20', padding: 10 }}>
            <Image source={require("../Image/logo.png")} style={style.logo} />

            <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Create New Account</Text>

            <View style={style.layout}>
                <Image source={require("../Image/account.png")} style={style.icon_input} />
                <TextInput style={style.input} placeholder="Username" placeholderTextColor={'white'} />
            </View>
            <Text style={style.error}>Không để trống ô nhập</Text>

            <View style={style.layout}>
                <Image source={require("../Image/mail.png")} style={style.icon_input} />
                <TextInput style={style.input} placeholder="Email" placeholderTextColor={'white'} />
            </View>
            <Text style={style.error}>Không để trống ô nhập</Text>

            <View style={style.layout}>
                <Image source={require("../Image/lock.png")} style={style.icon_input} />
                <TextInput style={style.input} placeholder="Password" placeholderTextColor={'white'} />
            </View>
            <Text style={style.error}>Không để trống ô nhập</Text>

            <TouchableOpacity style={style.button} onPress={() => { navigation.navigate('Login') }}>
                <Text style={style.register}>Register</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', marginTop: 25 }}>
                <View style={style.line}></View>
                <Text style={style.or}>OR</Text>
                <View style={style.line}></View>
            </View>

            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 25 }}>
                <View style={style.layout_login}>
                    <Image source={require('../Image/gmail.png')} style={style.icon_login} />
                </View>

                <View style={[style.layout_login, { marginLeft: 20, marginRight: 20 }]}>
                    <Image source={require('../Image/facebook.png')} style={style.icon_login} />
                </View>
                <View style={style.layout_login}>
                    <Image source={require('../Image/twitter.png')} style={style.icon_login} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', flex: 1, alignItems: "flex-end", alignSelf: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 16, color: 'white' }}>Dont have an account?</Text>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: 'green' }}> Sign up</Text>
            </View>

        </View>
    )
}

const style = StyleSheet.create({
    logo: {
        width: 180,
        height: 180,
        alignSelf: 'center',
        resizeMode: 'center'
    },
    layout: {
        flexDirection: 'row',
        borderRadius: 25,
        backgroundColor: '#22252e'
    },
    icon_input: {
        height: 28,
        width: 28,
        marginLeft: 10,
        alignSelf: 'center',
        tintColor: 'white'
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
        backgroundColor: '#1bac4b',
        padding: 10,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 10
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
        fontSize: 18,
        color: 'white'
    },
    layout_login: {
        borderWidth: 1,
        borderColor: '#4b4b4b',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        backgroundColor: '#1f222a'
    },
    icon_login: {
        height: 40,
        width: 40,
    }
})