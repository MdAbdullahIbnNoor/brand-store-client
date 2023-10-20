import { useContext } from "react"
import { AuthContext } from "../../providers/AuthProvider";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({ children }) => {

    const { user,loader } = useContext(AuthContext)

    if(loader){
        return <span className="loading loading-dots loading-lg my-72 mx-[900px]"></span>
    }

    else if (user) {
        return children;
    }

    return <Navigate to="/login"></Navigate>
}

export default PrivateRoute