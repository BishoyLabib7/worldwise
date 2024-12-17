import {useAuth} from "../contexts/FakeAuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function ProtectedRouter({children}) {
    const {isAuthenticated} = useAuth()
    const navigate = useNavigate()

    useEffect(function () {
        if (!isAuthenticated) navigate('/')
    }, [isAuthenticated, navigate])

    return isAuthenticated ? children : null
}

export default ProtectedRouter