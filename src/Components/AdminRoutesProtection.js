import { useContext, useEffect } from "react";
import MyContext from "../MyContext";
import { useNavigate } from "react-router-dom";
var AdminRoutesProtection = (props) => {
    const { user } = useContext(MyContext);
    const mynavigate = useNavigate();
    useEffect(() => {
        if (!user) {
            mynavigate("/login");
        }
        else {
            if (user.usertype != "admin") {
                mynavigate("/login");
            }
        }
    }, [user])
    return (
        <>
            <props.MyComp />
        </>
    )
}
export default AdminRoutesProtection;