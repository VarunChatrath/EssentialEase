import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

var UserRoutesProtector = (props) => {
    const { user } = useContext(UserContext);
    const mynavigate = useNavigate();
    useEffect(() => {
        if (!user) {
            mynavigate("/login");
        }
    }, [])

    return (
        <>
            <props.MyComp />
        </>
    )
}
export default UserRoutesProtector;