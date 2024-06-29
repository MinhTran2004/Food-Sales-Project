import { Image, Text, View } from "react-native";


export default function Profile() {
    return (
        <View style={{ flex: 1, backgroundColor: '#1f222a', padding: 10 }}>
            <Image source={require("../Image/man.png")} style={{ width: 150, height: 150, alignSelf: 'center' }} />

            <View style = {{marginTop: 50}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Họ và tên</Text>
                    <Text style={{ color: 'white', fontSize: 20 }}>Trần Công Minh</Text>
                </View>
            </View>

        </View>
    )
}