import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { UserModel } from "../Model/UserModel";
import { useDispatch, useSelector } from "react-redux";
import { userController } from "../Controller/UserController";

export default function Profile({ navigation }: any) {
    const [isVisible, setIsVisible] = useState(false)
    const [id, setId] = useState("")
    const [ten, setTen] = useState("")
    const [taikhoan, setTaiKhoan] = useState("")
    const [matkhau, setMatKhau] = useState("")
    const [sdt, setSdt] = useState("")
    const [diachi, setDiachi] = useState("")
    const [errorTen, setErrorTen] = useState("")
    const [errorTaikhoan, setErrorTaiKhoan] = useState("")
    const [errorMatkhau, setErrorMatKhau] = useState("")
    const [errorSdt, setErrorSdt] = useState("")
    const [errorDiachi, setErrorDiachi] = useState("")
    const [data, setData] = useState<any>("")
    const [loading, setLoading] = useState(true);

    const user = useSelector((state: any) => state.user.users[0]);

    const setUser1 = async (id: any) => {
        try {
            const reponse = await userController.getUserById(id)
            setData(reponse)
            setId(reponse.id)
            setTen(reponse.ten)
            setTaiKhoan(reponse.taikhoan)
            setMatKhau(reponse.matkhau)
            setSdt(reponse.sdt)
            setDiachi(reponse.diachi)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    const setUser2 = (user: any) => {
        const data = user
        setTen(data.ten)
        setTaiKhoan(data.taikhoan)
        setMatKhau(data.matkhau)
        setSdt(data.sdt)
        setDiachi(data.diachi)
    }

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

        if (diachi) {
            setErrorDiachi("")
        } else {
            setErrorDiachi("Không để trống ô nhập")
            check = false
        }
        return check
    }
    const updateUser = async () => {
        try {
            if (checkNullData()) {
                const userModel = new UserModel(undefined, ten, taikhoan, matkhau, sdt, diachi, undefined)
                const reponse = await userController.updateUser(user.id, userModel)
                if (reponse) {
                    setUser2(reponse)
                    setIsVisible(!isVisible)
                } else {
                    setIsVisible(isVisible)
                    console.log("Loi data");
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const dialogUdpateUser = () => {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isVisible}
                    onRequestClose={() => { setIsVisible(!isVisible) }}>

                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <View style={style.layoutupdate}>
                            <Text style={style.textTitle}>Thay đổi thông tin</Text>
                            <View>
                                <TextInput value={ten} placeholder="Nhập tên của bạn" style={style.layoutInput} onChangeText={text => setTen(text)} />
                                <Text style={style.error}>{errorTen}</Text>
                                <TextInput value={taikhoan} placeholder="Nhập tài khoản của bạn" style={style.layoutInput} onChangeText={text => setTaiKhoan(text)} />
                                <Text style={style.error}>{errorTaikhoan}</Text>
                                <TextInput value={matkhau} placeholder="Nhập mật khẩu của bạn" style={style.layoutInput} onChangeText={text => setMatKhau(text)} />
                                <Text style={style.error}>{errorMatkhau}</Text>
                                <TextInput value={sdt} placeholder="Nhập số điện thoại của bạn" style={style.layoutInput} onChangeText={text => setSdt(text)} />
                                <Text style={style.error}>{errorSdt}</Text>
                                <TextInput value={diachi} placeholder="Nhập địa chỉ của bạn" style={style.layoutInput} onChangeText={text => setDiachi(text)} />
                                <Text style={style.error}>{errorDiachi}</Text>
                            </View>
                            <TouchableOpacity style={{ margin: 5, alignItems: 'center' }} onPress={() => { updateUser() }}>
                                <Text style={[style.button, { backgroundColor: '#ffab40', color: 'black' }]}>Thay đổi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    useEffect(() => {
        setUser1(user.id)
    }, [1])

    return (
        <View style={{ flex: 1 }}>
            {loading ?
                (<View style={{ flex: 1, backgroundColor: '#1d1d21', alignItems: 'center', justifyContent: "center" }} >
                    <ActivityIndicator size="large" color="#0000ff" />
                </View >)
                :
                (<View style={{ flex: 1, backgroundColor: '#1f222a', padding: 10 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ marginTop: 10, marginBottom: 10 }}>
                            <Image source={require("../Image/return.png")} style={{ height: 23, width: 23, tintColor: 'white' }} />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 23, marginLeft: 20, textAlign: 'center' }}>Thông tin người dùng</Text>
                    </View>

                    <Image source={require("../Image/man.png")} style={{ width: 150, height: 150, alignSelf: 'center', marginTop: 30 }} />

                    <View style={{ marginTop: 60 }}>
                        <View style={style.layoutText}>
                            <Text style={style.text}>Họ và tên</Text>
                            <Text style={style.text}>{ten}</Text>
                        </View>
                        <View style={style.layoutText}>
                            <Text style={style.text}>Tài khoản</Text>
                            <Text style={style.text}>{taikhoan}</Text>
                        </View>
                        <View style={style.layoutText}>
                            <Text style={style.text}>Mật khẩu</Text>
                            <Text style={style.text}>{matkhau}</Text>
                        </View>
                        <View style={style.layoutText}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Số điện thoại</Text>
                            <Text style={style.text}>{sdt}</Text>
                        </View>
                        <View style={style.layoutText}>
                            <Text style={style.text}>Địa chỉ</Text>
                            <Text style={style.text}>{diachi}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={{ marginTop: 20, alignItems: 'center' }} onPress={() => { setIsVisible(!isVisible) }}>
                        <Text style={style.button}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                    {dialogUdpateUser()}
                </View>)
            }
        </View>

    )
}

const style = StyleSheet.create({
    textTitle: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
        marginBottom: 20
    },
    layoutupdate: {
        backgroundColor: '#ffdfb7',
        width: '95%',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 15
    },
    layoutText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        marginBottom: 20
    },
    text: {
        color: 'white',
        fontSize: 20,
        paddingBottom: 5,
    },
    button: {
        width: 150,
        backgroundColor: '#3b4050',
        padding: 10,
        borderRadius: 10,
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    layoutInput: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingLeft: 10
    },
    error: {
        color: 'red',
        textAlign: 'right',
        fontWeight: 'bold'
    }
})