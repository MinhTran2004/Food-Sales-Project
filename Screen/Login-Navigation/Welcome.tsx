import { Image, Text, View } from "react-native";

export default function Welcome(){
    return(
        <View style = {{flex: 1}}>
            <Image source={{uri: 'https://i.pinimg.com/564x/7a/18/9f/7a189f8d12f9f13e318a6fc24f0b903c.jpg'}} style = {{flex: 1, position: 'relative'}}/>
            <View style = {{position: "absolute", flex: 1, marginTop: '100%', marginLeft: '40%'}}>
                <Text style = {{}}>hohoho</Text>
            </View>
        </View>
    )
}