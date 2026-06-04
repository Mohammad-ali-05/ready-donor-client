import React, { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const UserProvider = ({ children }) => {
    /* React hooks */
    const [dbUser, setDbUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const [refetch, setRefetch] = useState(false);

    /* Custom hooks */
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchUser = () => {
            if (!user) {
                setDbUser(null);
                setUserLoading(false);
                return;
            }
            setUserLoading(true);

            axiosSecure
                .get("/user")
                .then((result) => {
                    setDbUser(result.data);
                })
                .catch((error) => {
                    // console.log(error);

                    toast.error(
                        error?.response?.data?.message ||
                            error?.message ||
                            "Something went wrong",
                    );
                })
                .finally(() => {
                    setUserLoading(false);
                });
        };
        fetchUser();
    }, [user, axiosSecure, refetch]);

    const dbUserData = {
        dbUser,
        userLoading,
        setUserLoading,
        setRefetch,
    };

    return <UserContext value={dbUserData}>{children}</UserContext>;
};

export default UserProvider;
