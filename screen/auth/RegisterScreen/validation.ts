import * as yup from "yup";

const validationSchema = () => {
    return yup.object().shape({
        username: yup
            .string()
            .required("Số điện thoại không được để trống"),

        password: yup
            .string()
            .required("Mật khẩu không được để trống"),

        confirmPassword: yup
            .string()
            .required("Xác nhận mật khẩu không được để trống")
            .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp"),

        email: yup
            .string()
            .email("Email không hợp lệ")
            .required("Email không được để trống"),

        fullname: yup
            .string()
            .required("Họ và tên không được để trống"),
    });
};

export {
    validationSchema
};
