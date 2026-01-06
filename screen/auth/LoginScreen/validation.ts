import * as yup from "yup";

const validationSchema = () => {
    return yup.object().shape({
        username: yup
            .string()
            .required("Số điện thoại không được để trống"),
        password: yup
            .string()
            .required("Mật khẩu không được để trống"),
    });
}

export {
    validationSchema
};
