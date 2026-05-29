import React, { useContext } from "react";
import { UserContext } from "../contexts/userContext";

const useDbUser = () => {
    const userInfo = useContext(UserContext);
    return userInfo;
};

export default useDbUser;
