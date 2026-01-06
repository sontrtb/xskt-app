import { IUserAuth } from "@/api/auth"
import { useAuth } from "@/stores/useAuth"
import { useTimeLogout } from "@/stores/useTimeLogout"

function useLoginHandle() {
    const { setUser } = useAuth()
    const { setTimeLogout } = useTimeLogout()

    const onLogin = (userData: IUserAuth) => {
        setUser(userData)
        setTimeLogout(new Date())
    }

    return onLogin
}

export default useLoginHandle