import { StyleSheet, View } from "react-native";

function WeatherBox() {
    return (
        <View style={styles.root}>

        </View>
    )
}

export default WeatherBox

const styles = StyleSheet.create({
    root: {
        
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
      "keystorePath": "./bms-key.keystore",
      "keystorePassword": "******",
      "keyAlias": "bms",
      "keyPassword": "******"
    }
  }
}
```

npx expo prebuild

eas build -p android --profile production --local# xskt-app
