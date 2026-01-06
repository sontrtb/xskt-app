import { PADDING_PAGE } from '@/theme/layout';
import Feather from '@expo/vector-icons/Feather';
import { GlassView } from 'expo-glass-effect';
import { Image, ImageBackground } from 'expo-image';
import { ReactElement } from 'react';
import { StyleSheet, View } from "react-native";
import KeyboardAvoidingViewUi from '../ui/KeyboardAvoidingViewUi';
import TextUi from '../ui/TextUi';
import TouchableOpacityUi from '../ui/TouchableOpacityUi';

const heightBg = 440;

interface AuthLayoutProps {
    children: ReactElement,
    backAction?: () => void,
    heightHeaderSubtraction?: number,
}

function AuthLayout({ children, backAction, heightHeaderSubtraction = 0 }: AuthLayoutProps) {
    const heightBgTmp = heightBg - heightHeaderSubtraction

    return (
        <KeyboardAvoidingViewUi
            contentContainerStyle={styles.root}
            bounces={false}
        >
            <ImageBackground
                source={require('@/assets/images/bg_auth.png')}
                style={{ flex: 1, }}
                contentPosition="bottom"
                resizeMode="cover"
                imageStyle={[styles.imageBg, { height: heightBgTmp }]}

            >
                {
                    backAction &&
                    <TouchableOpacityUi style={styles.backBtnWrap} onPress={backAction}>
                        <GlassView style={styles.backBtn} glassEffectStyle="clear">
                            <Feather name="arrow-left" size={28} color="#fff" />
                            <TextUi style={styles.textBack} weight="bold">Quay lại</TextUi>
                        </GlassView>
                    </TouchableOpacityUi>
                }
                <View style={[styles.logoWrap, { top: heightBgTmp - 254 }]}>
                    <Image style={styles.logo} source={require("@/assets/images/icon_white.png")} />
                </View>

                <View style={{ marginTop: heightBgTmp - 140, flex: 1 }}>
                    {children}
                </View>


            </ImageBackground>
        </KeyboardAvoidingViewUi>
    )
}

export default AuthLayout

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        paddingBottom: PADDING_PAGE
    },
    backBtnWrap: {
        position: "absolute",
        top: 60,
        left: PADDING_PAGE,
        zIndex: 1000,
    },
    backBtn: {
        padding: 8,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    imageBg: {

    },
    textBack: {
        color: "#fff",
        fontSize: 16
    },
    logoWrap: {
        position: "absolute",
        right: 20,
    },
    logo: {
        height: 150,
        width: 150
    }
})
