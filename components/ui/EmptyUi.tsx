import { Image } from 'expo-image';
import { StyleSheet, View } from "react-native";
import TextUi from './TextUi';

function EmptyUi() {
    return (
        <View style={style.root}>
            <Image
                style={style.img}
                source={require("@/assets/icons/ic_empty.png")}
            />
            <TextUi style={style.text} >Không có dữ liệu</TextUi>
        </View>
    )
}

const style = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 100,
        gap: 20
    },
    img: {
        height: 160,
        width: 160
    },
    text: {
        fontSize: 18,
        opacity: 0.5
    }
})

export default EmptyUi