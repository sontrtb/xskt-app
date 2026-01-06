import { IRegisterData, register } from "@/api/auth";
import AuthLayout from "@/components/commons/AuthLayout";
import TemsLink from "@/components/commons/TemsLink";
import ButtonUi from "@/components/ui/ButtonUi";
import TextInputUi from "@/components/ui/TextInputUi";
import TextUi from "@/components/ui/TextUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useTheme from "@/hooks/useColor";
import { toastError, toastSuccess } from "@/lib/toast";
import { PADDING_PAGE } from "@/theme/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    useMutation,
} from '@tanstack/react-query';
import { useRouter } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Dimensions, StyleSheet, View } from "react-native";
import { validationSchema } from "./validation";

const windowHeight = Dimensions.get('window').height;

function RegisterScreen() {
    const color = useTheme()

    const router = useRouter()

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IRegisterData>({
        defaultValues: {
            username: "",
            password: '',
        },
        resolver: yupResolver(validationSchema()),
    })


    const registerMuatation = useMutation({
        mutationFn: register,
        onSuccess: (res) => {
            toastSuccess("Đăng kí thành công", "Vui lòng đăng nhập")
            router.replace("/auth/login")
        },
        onError: (err) => {
            console.log(err)
            toastError(err.message)
        },
    })

    const onRegister: SubmitHandler<IRegisterData> = (v: IRegisterData) => {
        registerMuatation.mutate(v)
    }

    return (
        <AuthLayout
            backAction={() => {
                router.replace("/auth/login")
            }}
            heightHeaderSubtraction={windowHeight / 6}
        >
            <View style={styles.root}>
                <View>
                    <TextUi allowFontScaling={false} style={[styles.title, { color: color.primary }]}>Đăng ký</TextUi>
                    <View style={[styles.diriver, { backgroundColor: color.primary }]} />
                    <View style={styles.card}>
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

                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => {
                                return <TextInputUi
                                    label="Email"
                                    placeholder="Nhập email"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    errorText={errors.email?.message}
                                />
                            }}
                        />

                        <Controller
                            name="fullname"
                            control={control}
                            render={({ field }) => {
                                return <TextInputUi
                                    label="Họ và Tên"
                                    placeholder="Nhập họ và tên"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    errorText={errors.fullname?.message}
                                />
                            }}
                        />

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

                         <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => {
                                return <TextInputUi
                                    isPassword
                                    label="Nhập lại mật khẩu"
                                    placeholder="Nhập mật khẩu"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    errorText={errors.confirmPassword?.message}
                                />
                            }}
                        />

                    </View>
                </View>

                <View>
                    <ButtonUi
                        text="Đăng ký"
                        style={styles.buttonLogin}
                        onPress={handleSubmit(onRegister)}
                        isLoading={registerMuatation.isPending}
                    />

                    <View style={styles.footer}>
                        <TextUi>Bạn chưa đã tài khoản?</TextUi>
                        <TouchableOpacityUi onPress={() => {router.replace("/auth/login")}}>
                            <TextUi style={{ color: color.primary, fontWeight: "600" }}>Đăng nhập</TextUi>
                        </TouchableOpacityUi>
                    </View>

                    <TemsLink />
                </View>

            </View>
        </AuthLayout>
    )
}

export default RegisterScreen

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
    card: {
        gap: 24,
        marginTop: 28,
        width: "100%"
    },
    buttonLogin: {
        // flex: 1
        marginTop: PADDING_PAGE
    },
    forgotPassword: {
        alignItems: "flex-end",
    },
    icon: {
        height: 22,
        width: 22,
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
