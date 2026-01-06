import Toast from "react-native-toast-message";

const toastSuccess = (message: string, message2?: string) => {
    Toast.show({
        type: "success",
        text1:  message,
        text2: message2
    });
}

const toastError = (message: string, message2?: string) => {
    Toast.show({
        type: "error",
        text1:  message,
        text2: message2
    });
}

const toastCommingSoon = () => {
    Toast.show({
        type: "error",
        text1:  "Tính năng đang phát triển",
        text2: "Vui lòng trở lại sau"
    });
}

export {
    toastCommingSoon, toastError,
    toastSuccess
};

