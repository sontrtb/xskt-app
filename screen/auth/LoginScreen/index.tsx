import { ILoginData, login } from "@/api/auth";
import AuthLayout from "@/components/commons/AuthLayout";
import TemsLink from "@/components/commons/TemsLink";
import ButtonUi from "@/components/ui/ButtonUi";
import TextInputUi from "@/components/ui/TextInputUi";
import TextUi from "@/components/ui/TextUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useTheme from "@/hooks/useColor";
import { toastError } from "@/lib/toast";
import { PADDING_PAGE } from "@/theme/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    useMutation,
} from '@tanstack/react-query';
import { useRouter } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { validationSchema } from "./validation";


function LoginScreen() {
    const color = useTheme()

    const router = useRouter()

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<ILoginData>({
        defaultValues: {
            username:'',
            password: '',
        },
        resolver: yupResolver(validationSchema()),
    })

    const loginMuatation = useMutation({
        mutationFn: login,
        onSuccess: (res) => {
            // onLoginSuccess(res.data)
        },
        onError: (err) => {
            console.log(err)
            toastError(err.message)
        },
    })

    const onLogin: SubmitHandler<ILoginData> = (v: ILoginData) => {
        loginMuatation.mutate(v)
    }

    const resetLogin = () => {
        reset()
    }

    return (
        <AuthLayout>
            <View style={styles.root}>
                <View>
                    {/* <TextUi allowFontScaling={false} style={[styles.title, { color: color.primary }]}>{enabelBiometric?.enabel ? "Xin chào" : "Đăng nhập"}</TextUi>
                    {enabelBiometric?.data.fullname &&
                        <TextUi allowFontScaling={false} style={[styles.subTitle, { color: color.primary }]}>{enabelBiometric?.data.fullname}</TextUi>
                    }
                    <View style={[styles.diriver, { backgroundColor: color.primary }]} />

                    {
                        enabelBiometric?.data.username &&
                        <TouchableOpacityUi onPress={resetLogin}>
                            <TextUi style={{ textDecorationLine: 'underline' }}>Hoặc đăng nhập bằng tài khoản khác</TextUi>
                        </TouchableOpacityUi>
                    } */}


                    <View style={styles.card}>
                        {/* {
                            !enabelBiometric?.data.username &&
                            <Controller
                                name="username"
                                control={control}
                                render={({ field }) => {
                                    return <TextInputUi
                                        errorText={errors.username?.message}
                                        label="Số điện thoại"
                                        placeholder="Nhập số điện thoại"
                                        value={field.value}
                                        onChangeText={field.onChange}
                                    />
                                }}
                            />
                        } */}

                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => {
                                return <TextInputUi
                                    isPassword
                                    label="Mật khẩu"
                                    placeholder="Nhập mật khẩu"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    errorText={errors.password?.message}
                                />
                            }}
                        />

                        {/* <TouchableOpacityUi style={styles.forgotPassword} onPress={toastCommingSoon}>
                            <TextUi style={{ color: color.primary, fontWeight: "600" }}>Quên mật khẩu</TextUi>
                        </TouchableOpacityUi> */}

                    </View>
                </View>

                <View>
                        <ButtonUi
                            text="Đăng nhập"
                            style={styles.buttonLogin}
                            onPress={handleSubmit(onLogin)}
                            isLoading={loginMuatation.isPending}
                        />
                   
                    <View style={styles.footer}>
                        <TextUi>Bạn chưa có tài khoản?</TextUi>
                        <TouchableOpacityUi onPress={() => { router.push("/auth/register") }}>
                            <TextUi style={{ color: color.primary, fontWeight: "600" }}>Đăng ký</TextUi>
                        </TouchableOpacityUi>
                    </View>

                    <TemsLink />
                </View>

            </View>
        </AuthLayout>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: PADDING_PAGE,
    },
    title: {
        fontSize: 32,
        fontWeight: "600"
    },
    subTitle: {
        fontSize: 20,
        fontWeight: "600"
    },
    card: {
        gap: 24,
        marginTop: 28,
        width: "100%"
    },
    buttonLogin: {
        flex: 1,
    },
    forgotPassword: {
        alignItems: "flex-end",
    },
    diriver: {
        width: 80,
        height: 2,
        marginBottom: 8,
        marginTop: 8
    },
    footer: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "center",
        gap: 6
    },
})
