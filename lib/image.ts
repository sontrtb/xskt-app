import { useAuth } from "@/stores/useAuth"

function headersImage()  {
    const accessToken = useAuth.getState().user?.accessToken

    return {
        "Authorization": `Bearer ${accessToken}`
    }
}

export {
    headersImage
}
