import useColor from '@/hooks/useColor';
import useNotificationObserver from '@/hooks/useNotificationObserver';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Routers() {

    const insets = useSafeAreaInsets();
    const bottomBarHeight = Platform.OS === "android" ? insets.bottom : 0;

    const color = useColor();

    useNotificationObserver();

    return (
        <Stack
            screenOptions={{
                contentStyle: { backgroundColor: color.bg },
                headerStyle: { backgroundColor: color.bg },
                headerTintColor: color.text,
            }}
        >
            <Stack.Protected guard={true}>
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        title: "Trang chủ",
                        headerShown: false
                    }}
                />
            </Stack.Protected>

            <Stack.Screen
                name="chat"
                options={{
                    title: 'Giải mã giấc mơ',
                    headerBackButtonDisplayMode: "minimal",
                    contentStyle: {
                        paddingBottom: bottomBarHeight
                    }
                }}
            />

            <Stack.Screen
                name="note/note-form"
                options={{
                    title: 'Ghi chú',
                    headerBackButtonDisplayMode: "minimal",
                    contentStyle: {
                        paddingBottom: bottomBarHeight
                    }
                }}
            />

            <Stack.Screen
                name="live-result"
                options={{
                    title: 'Kết quả trực tiếp',
                    headerBackButtonDisplayMode: "minimal",
                    contentStyle: {
                        paddingBottom: bottomBarHeight
                    }
                }}
            />

            <Stack.Screen
                name="result"
                options={{
                    title: 'Kết quả',
                    headerBackButtonDisplayMode: "minimal",
                    contentStyle: {
                        paddingBottom: bottomBarHeight
                    }
                }}
            />


            <Stack.Protected guard={false}>
                <Stack.Screen
                    name="auth/login"
                    options={{
                        headerShown: false,
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }} />
                <Stack.Screen
                    name="auth/register"
                    options={{
                        headerShown: false,
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />
            </Stack.Protected>

            <Stack.Screen
                name="tems/terms-of-use"
                options={{
                    title: 'Điều khoản sử dụng',
                    headerBackButtonDisplayMode: "minimal",
                    contentStyle: {
                        paddingBottom: bottomBarHeight
                    }
                }}
            />
            <Stack.Screen
                name="tems/confidentiality-policy"
                options={{
                    title: 'Chính sách bảo mật',
                    headerBackButtonDisplayMode: "minimal",
                    contentStyle: {
                        paddingBottom: bottomBarHeight
                    }
                }}
            />
        </Stack>
    )
}

export default Routers