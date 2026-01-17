import TextInputUi from "@/components/ui/TextInputUi";
import data from "@/configs/dream_book_data.json";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { StyleSheet, View } from "react-native";

function DreamBook() {
    console.log(data)
    const color = useColor()

    return (
        <View style={[styles.root, {backgroundColor: color.bg}]}>
            <TextInputUi
                placeholder="Tìm kiếm từ khoá: bò, gà, ăn cỗ..."
            />
        </View>
    )
}

export default DreamBook

const styles = StyleSheet.create({
    root: {
        padding: PADDING_PAGE
    }
})


## Build apk local
npx expo prebuild

eas build -p android --profile preview --local

## Build abb prd
Tạo file credentials.json
```
{
  "android": {
    "keystore": {
      "keystorePath": "./xskt.keystore",
      "keystorePassword": "******",
      "keyAlias": "xskt",
      "keyPassword": "******"
    }
  }
}
```

npx expo prebuild

eas build -p android --profile production --local