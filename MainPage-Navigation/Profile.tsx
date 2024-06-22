import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
    return (
        <View style={{ flex: 1, backgroundColor: '#181a20' }}>

            {/* Header  */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require("../Image/logo.png")} style={{ width: 40, height: 40, resizeMode: 'center' }} />
                    <Text style={{ color: 'white', fontSize: 25, fontWeight: '500', marginLeft: 10 }}>Profile</Text>
                </View>
                <Image source={require("../Image/support.png")} style={{ width: 45, height: 45, resizeMode: 'cover' }} />
            </View>

            {/* image  */}
            <View style={style.layout_avatar}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require("../Image/man.png")} style={{ width: 70, height: 70, resizeMode: 'center' }} />
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Trần Công Minh</Text>
                        <Text style={{ color: 'white', fontSize: 18, marginTop: 10 }}>0976577025</Text>
                    </View>
                </View>
                <Image source={require("../Image/edit.png")} style={{ width: 20, height: 20, resizeMode: 'center', tintColor: '#1bac4b' }} />
            </View>

            {/* body 1 */}
            <View style={{ borderBottomWidth: 1, borderColor: '#757575', padding: 10, paddingBottom: 15 }}>

                <TouchableOpacity>
                    <View style={style.layout_item} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../Image/offlike.png")} style={{ width: 25, height: 25, tintColor: 'white' }} />
                            <Text style={{ color: 'white', fontSize: 20, marginLeft: 15 }}>My favorite Restaurants</Text>
                        </View>
                        <Image source={require("../Image/iconright.png")} style={{ width: 16, height: 16, tintColor: 'white' }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={style.layout_item}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../Image/sell.png")} style={{ width: 25, height: 25, tintColor: 'white' }} />
                            <Text style={{ color: 'white', fontSize: 20, marginLeft: 15 }}>Special Offers & Promo</Text>
                        </View>
                        <Image source={require("../Image/iconright.png")} style={{ width: 16, height: 16, tintColor: 'white' }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={style.layout_item}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../Image/wallet.png")} style={{ width: 25, height: 25, tintColor: 'white' }} />
                            <Text style={{ color: 'white', fontSize: 20, marginLeft: 15 }}>Payment Methos</Text>
                        </View>
                        <Image source={require("../Image/iconright.png")} style={{ width: 16, height: 16, tintColor: 'white' }} />
                    </View>
                </TouchableOpacity>

            </View>

            {/* body 2 */}
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>

                <TouchableOpacity>
                    <View style={style.layout_item}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Image source={require("../Image/user.png")} style={{ width: 25, height: 25, tintColor: 'white', }} />
                            <Text style={{ color: 'white', fontSize: 20, marginLeft: 15 }}>Profile</Text>
                        </View>
                        <Image source={require("../Image/iconright.png")} style={{ width: 16, height: 16, tintColor: 'white' }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={style.layout_item} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../Image/location.png")} style={{ width: 25, height: 25, tintColor: 'white' }} />
                            <Text style={{ color: 'white', fontSize: 20, marginLeft: 15 }}>Address</Text>
                        </View>
                        <Image source={require("../Image/iconright.png")} style={{ width: 16, height: 16, tintColor: 'white' }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={style.layout_item} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../Image/notification.png")} style={{ width: 25, height: 25, tintColor: 'white' }} />
                            <Text style={{ color: 'white', fontSize: 20, marginLeft: 15 }}>Notification</Text>
                        </View>
                        <Image source={require("../Image/iconright.png")} style={{ width: 16, height: 16, tintColor: 'white' }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={style.layout_item} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../Image/secure.png")} style={{ width: 25, height: 25, tintColor: 'white' }} />
                            <Text style={{ color: 'white', fontSize: 20, marginLeft: 15 }}>Secure</Text>
                        </View>
                        <Image source={require("../Image/iconright.png")} style={{ width: 16, height: 16, tintColor: 'white' }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={style.layout_item} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../Image/language.png")} style={{ width: 25, height: 25, tintColor: 'white' }} />
                            <Text style={{ color: 'white', fontSize: 20, marginLeft: 15 }}>Language</Text>
                        </View>
                        <Image source={require("../Image/iconright.png")} style={{ width: 16, height: 16, tintColor: 'white' }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={style.layout_item} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../Image/show.png")} style={{ width: 25, height: 25, tintColor: 'white' }} />
                            <Text style={{ color: 'white', fontSize: 20, marginLeft: 15 }}>Drak Mode</Text>
                        </View>
                        <Image source={require("../Image/iconright.png")} style={{ width: 16, height: 16, tintColor: 'white' }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={style.layout_item} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../Image/help.png")} style={{ width: 25, height: 25, tintColor: 'white' }} />
                            <Text style={{ color: 'white', fontSize: 20, marginLeft: 15 }}>Help Center</Text>
                        </View>
                        <Image source={require("../Image/iconright.png")} style={{ width: 16, height: 16, tintColor: 'white' }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={style.layout_item} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../Image/friends.png")} style={{ width: 25, height: 25, tintColor: 'white' }} />
                            <Text style={{ color: 'white', fontSize: 20, marginLeft: 15 }}>Invite Friends</Text>
                        </View>
                        <Image source={require("../Image/iconright.png")} style={{ width: 16, height: 16, tintColor: 'white' }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={style.layout_item} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../Image/logOut.png")} style={{ width: 25, height: 25, tintColor: '#e85051' }} />
                            <Text style={{ color: '#e85051', fontSize: 20, marginLeft: 15 }}>Log Out</Text>
                        </View>
                        <Image source={require("../Image/iconright.png")} style={{ width: 16, height: 16, tintColor: 'white' }} />
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const style = StyleSheet.create({
    layout_avatar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        borderBottomWidth: 0.8,
        borderBlockColor: '#757575',
        padding: 10,
        paddingBottom: 15
    },
    layout_item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 11,
    }
})