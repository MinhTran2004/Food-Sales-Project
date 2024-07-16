import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { userController } from "../Controller/UserController";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/Reducer/userSlice";

export default function Login({ navigation }: any) {
    const [taikhoan, setTaiKhoan] = useState("minh2004@gmail.com")
    const [matkhau, setMatKhau] = useState("123")
    const [errorTaikhoan, setErrorTaiKhoan] = useState("")
    const [errorMatkhau, setErrorMatKhau] = useState("")
    const [hidePassword, setHidePassword] = useState(true);

    const dispatch = useDispatch();

    const checkNullData = () => {
        let check = true
        if (taikhoan === "admin" && matkhau === "123") {
            check = true
        } else {
            if (taikhoan) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const isEmail = re.test(String(taikhoan).toLocaleLowerCase())
                if (isEmail) {
                    setErrorTaiKhoan("")
                } else {
                    setErrorTaiKhoan("Không đúng định dạng Email")
                    check = false
                }
            } else {
                setErrorTaiKhoan("Không để trống ô nhập")
                check = false
            }
            if (matkhau) {
                setErrorMatKhau("")
            } else {
                setErrorMatKhau("Không để trống ô nhập")
                check = false
            }
        }
        return check
    }

    const checkLogin = async () => {
        if (checkNullData()) {
            try {
                const check = await userController.checkUserLogin(taikhoan, matkhau);
                if (check) {
                    navigation.navigate('Main')
                    setData(check)
                } else {
                    setErrorMatKhau("Sai mật khẩu")
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const setData = (check: any) => {
        dispatch(setUser(check))
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#181a20', padding: 10 }}>
            <Image source={require("../Image/logo.png")} style={style.logo} />

            <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 70 }}>Create New Account</Text>
            {/* username */}
            <View style={style.layout}>
                <Image source={require("../Image/mail.png")} style={style.icon_input} />
                <TextInput style={style.input} placeholder="Email" placeholderTextColor={'white'} onChangeText={text => setTaiKhoan(text)} />
            </View>
            <Text style={style.error}>{errorTaikhoan}</Text>

            {/* Password */}
            <View style={[style.layout, { alignItems: 'center', justifyContent: 'space-between' }]}>
                {hidePassword ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../Image/lock.png')} style={style.icon_input} />
                            <TextInput style={style.input} placeholder="Password" placeholderTextColor={"white"} onChangeText={text => setMatKhau(text)} />
                        </View>
                        <TouchableOpacity onPress={() => { setHidePassword(!hidePassword) }}>
                            <Image source={require('../Image/show.png')} style={{ width: 27, height: 27, tintColor: 'white' }} />
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../Image/lock.png')} style={style.icon_input}/>
                            <TextInput style={style.input} placeholder="Password" placeholderTextColor={"white"} secureTextEntry={true} onChangeText={text => setMatKhau(text)} />
                        </View>
                        <TouchableOpacity onPress={() => { setHidePassword(!hidePassword) }}>
                            <Image source={require('../Image/hide.png')} style={{ width: 28, height: 28, tintColor: 'white' }} />
                        </TouchableOpacity>
                    </View>
                }
            </View>
            <Text style={style.error}>{errorMatkhau}</Text>

            {/* button login */}
            <TouchableOpacity style={style.button} onPress={() => { checkLogin() }}>
                <Text style={style.login}>Login</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', marginTop: 50 }}>
                <View style={style.line}></View>
                <Text style={style.or}>OR</Text>
                <View style={style.line}></View>
            </View>

            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 30 }}>
                <View style={style.layout_login} >
                    <Image source={require('../Image/facebook.png')} style={style.icon_login} />
                </View>
                <View style={[style.layout_login, { marginLeft: 20, marginRight: 20 }]}>
                    <Image source={require('../Image/gmail.png')} style={style.icon_login} />
                </View>
                <View style={style.layout_login}>
                    <Image source={require('../Image/twitter.png')} style={style.icon_login} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', flex: 1, alignItems: "flex-end", alignSelf: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 16, color: 'white' }}>Dont have an account?</Text>
                <TouchableOpacity onPress={() => { navigation.navigate('Register') }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: 'green' }}> Sign up</Text>
                </TouchableOpacity>

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
        marginTop: 5,
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
        width: '75%',
        marginLeft: 10,
        paddingLeft: 10,
        borderLeftWidth: 0.5,
        color: 'white'
    },
    error: {
        color: 'red',
        textAlign: 'right'
    },
    button: {
        width: '100%',
        backgroundColor: '#1bac4b',
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


