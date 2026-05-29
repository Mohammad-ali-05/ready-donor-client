import React, { useEffect, useState } from "react";
import { UserContext } from "./userContext";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const UserProvider = ({ children }) => {
    /* React hooks */
    const [dbUser, setDbUser] = useState(null);

    /* Custom hooks */
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user) {
            axiosSecure
                .get("/user")
                .then((result) => {
                    setDbUser(result.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user, axiosSecure]);

    const dbUserData = {
        dbUser,
    };

    return <UserContext value={dbUserData}>{children}</UserContext>;
};

export default UserProvider;
