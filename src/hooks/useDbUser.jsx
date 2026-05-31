import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const useDbUser = () => {
    const dbUser = useContext(UserContext);
    return dbUser;
};

export default useDbUser;
