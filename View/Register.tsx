import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { TypeUser, UserModel } from "../Model/UserModel";
import { userController } from "../Controller/UserController";

export default function Register({ navigation }: any) {
    const [ten, setTen] = useState("")
    const [taikhoan, setTaiKhoan] = useState("")
    const [matkhau, setMatKhau] = useState("")
    const [sdt, setSdt] = useState("")
    const [errorTen, setErrorTen] = useState("")
    const [errorTaikhoan, setErrorTaiKhoan] = useState("")
    const [errorMatkhau, setErrorMatKhau] = useState("")
    const [errorSdt, setErrorSdt] = useState("")

    const checkNullData = () => {
        let check = true
        if (ten) {
            setErrorTen("")
        } else {
            setErrorTen("Không để trống ô nhập")
            check = false
        }

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

        if (sdt) {
            const re = /^[0-9]{10}$/;
            const isSdt = re.test(String(sdt));
            if (isSdt) {
                setErrorSdt("")
            } else {
                setErrorSdt("Nhập sai định dạng SDT")
                check = false
            }
        } else {
            setErrorSdt("Không để trống ô nhập")
            check = false
        }

        return check
    }

    const addNewUser = async () => {
        if (checkNullData()) {
            const data = new UserModel(undefined, ten, taikhoan, matkhau, sdt, undefined, undefined)
            try {
                const check = await userController.getUserByAccount(taikhoan);
                if (check) {
                    setErrorTaiKhoan("Tài khoản đã tồn tại")
                }else{
                    await userController.addNewUser(data, taikhoan)
                }

            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("123");
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#181a20', padding: 10 }}>
            <Image source={require("../Image/logo.png")} style={style.logo} />

            <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Create New Account</Text>

            <View style={style.layout}>
                <Image source={require("../Image/account.png")} style={style.icon_input} />
                <TextInput style={style.input} placeholder="Tên Người dùng" placeholderTextColor={'white'} onChangeText={text => setTen(text)} />
            </View>
            <Text style={style.error}>{errorTen}</Text>

            <View style={style.layout}>
                <Image source={require("../Image/mail.png")} style={style.icon_input} />
                <TextInput style={style.input} placeholder="Email" placeholderTextColor={'white'} onChangeText={text => setTaiKhoan(text)} />
            </View>
            <Text style={style.error}>{errorTaikhoan}</Text>

            <View style={style.layout}>
                <Image source={require("../Image/lock.png")} style={style.icon_input} />
                <TextInput style={style.input} placeholder="Mật khẩu" placeholderTextColor={'white'} onChangeText={text => setMatKhau(text)} />
            </View>
            <Text style={style.error}>{errorMatkhau}</Text>

            <View style={style.layout}>
                <Image source={require("../Image/phone.png")} style={style.icon_input} />
                <TextInput style={style.input} placeholder="Số điện thoại" placeholderTextColor={'white'} onChangeText={text => setSdt(text)} />
            </View>
            <Text style={style.error}>{errorSdt}</Text>

            <TouchableOpacity style={style.button} onPress={() => { addNewUser() }}>
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
        color: 'white'
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