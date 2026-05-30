import React, { useContext } from "react";
import { UserContext } from "../contexts/userContext";

const useDbUser = () => {
    const dbUser = useContext(UserContext);
    return dbUser;
};

export default useDbUser;
