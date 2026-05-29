import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
    // react hook
    const navigate = useNavigate();
    const location = useLocation();

    // react form hook
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    // Data from custom hooks
    const { setUser, signInUser } = useAuth();

    /* Handle form login */
    const handleFormSubmit = (data) => {
        const loginPromise = async () => {
            try {
                const { email, password } = data;

                // Create Firebase user
                const result = await signInUser(email, password);
                setUser(result.user);

                /* If user login successful then navigate to desired page or home page */
                if (result?.user.email) {
                    navigate(location?.state || "/home");
                }

                return result.user;
            } catch (error) {
                if (error.code === "auth/invalid-credential") {
                    setError(
                        setError("password", {
                            type: "manual",
                            message: "Invalid email or password",
                        }),
                    );
                }
                throw error;
            }
        };

        toast.promise(loginPromise(), {
            pending: "Logging in user...",
            success: {
                render({ data }) {
                    return `Welcome back ${data.displayName}`;
                },
            },
            error: "Failed to Login",
        });
    };
    return (
        <section className="relative bg-linear-to-br  from-red-50 to-red-100">
            <div className="flex justify-center items-center max-w-7xl min-h-[calc(100vh-64px)] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="card bg-base-100 w-full max-w-lg shrink-0 p-6">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl mb-2">Welcome Back</h2>
                        <p className="text-[#717182] text-sm">
                            Sign in to your Ready Donor account to continue
                            helping save lives
                        </p>
                    </div>
                    <form
                        onSubmit={handleSubmit(handleFormSubmit)}
                        className="card-body p-0">
                        {/* User Info */}
                        <fieldset className="fieldset">
                            {/* email */}
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-700">
                                Email *
                            </label>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email",
                                    },
                                })}
                                type="email"
                                placeholder="Enter your full email"
                                className="w-full h-9 px-3 rounded-md border border-gray-300 bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 disabled:opacity-50"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}

                            {/* Password */}
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-gray-700">
                                Password *
                            </label>
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                })}
                                type="password"
                                placeholder="Create your password"
                                className="w-full h-9 px-3 rounded-md border border-gray-300 bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 disabled:opacity-50"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </fieldset>
                        <button className="text-lg text-white font-semibold  rounded-md bg-linear-to-r from-[#B32346] to-[#46052D] h-10 hover:opacity-85 w-full mt-4">
                            Login
                        </button>
                    </form>
                    <Link to={"/auth/register"} state={location?.state}>
                        <div className="text-center text-sm font-medium text-gray-700 mt-4">
                            Already have an account?{" "}
                            <button
                                type="button"
                                className="text-[#8d1f3a] hover:underline">
                                Register in here.
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Login;
