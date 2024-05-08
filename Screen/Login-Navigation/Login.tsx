import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login({navigation}:any) {
    const [hidePassword, setHidePassword] = useState(true);


    return (
        <View style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
            <Image source={require("../Image/logo.png")} style={style.logo} />

            {/* body  */}
            <View style={style.layout}>
                <Image source={require("../Image/mail.png")} style={style.icon_input} />
                <TextInput style={style.input} placeholder="Email" />
            </View>
            <Text style={style.error}> hello</Text>

            <View style={[style.layout, { justifyContent: 'space-between' }]}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../Image/lock.png')} style={style.icon_input} />
                    <TextInput style={style.input} placeholder="Password" />
                </View>
                <TouchableOpacity style = {{alignSelf: 'center'}} onPress={() => {setHidePassword(!hidePassword)}}>
                    {hidePassword ? <Image source={require('../Image/show.png')} style = {{width: 28, height: 28, marginRight: 10}}/> : <Image source={require('../Image/hide.png')} style = {{width: 28, height: 28, marginRight: 10}}/>}
                </TouchableOpacity>
            </View>
            <Text style={style.error}> hello</Text>

            <TouchableOpacity style={style.button} onPress={() => {navigation.navigate('Register')}}>
                <Text style={style.login}>Login</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', marginTop: 70 }}>
                <View style={style.line}></View>
                <Text style={style.or}>OR</Text>
                <View style={style.line}></View>
            </View>

            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 70 }}>
                <Image source={require('../Image/gmail.png')} style={style.icon_login} />
                <Image source={require('../Image/facebook.png')} style={[style.icon_login, { marginLeft: 50, marginRight: 50 }]} />
                <Image source={require('../Image/twitter.png')} style={style.icon_login} />
            </View>

            <View style = {{flexDirection: 'row', flex: 1, alignItems: "flex-end", alignSelf: 'center', marginBottom: 10}}>
                <Text style = {{fontSize: 16}}>Dont have an account?</Text>
                <Text style = {{fontSize: 16, fontWeight: "bold"}}> Sign up</Text>
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
        marginTop: 5,
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
        borderLeftWidth: 0.5,
    },
    error: {
        color: 'red',
        textAlign: 'right'
    },
    button: {
        width: '100%',
        backgroundColor: 'red',
        padding: 10,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 20
    },
    login: {
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


