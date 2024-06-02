import { Image, StyleSheet, Text, TextInput, View } from "react-native";

export default function Sreach() {
    return (
        <View style={{ flex: 1, padding: 5, backgroundColor: '#1d1d21' }}>
            <View style={style.layout_sreach}>
                <Image source={require("../Image/sreach.png")} style={{ width: 20, height: 20, tintColor: 'white' }} />
                <TextInput placeholder="Bạn đang cần tìm gì ?" placeholderTextColor={'white'} style={{ marginLeft: 10 }} />
            </View>

            {/* <View style = {{flex: 1, backgroundColor: '#181a20', alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require("../Image/datanull.png")} style= {{resizeMode: 'cover'}} />
            </View> */}

        </View>
    )


}

const style = StyleSheet.create({
    layout_sreach: {
        borderRadius: 15,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1f222a',
    },
})