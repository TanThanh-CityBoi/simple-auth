import React, { useState } from "react";
import { useFormik } from "formik";
import { BiHide, BiShow } from "react-icons/bi"
import * as Yup from "yup";

function SignUpForm(props) {

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const formik = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: false,
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string()
                .required("Required")
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    "Password must be minimum eight characters, at least one letter and one number"
                ),
            confirmPassword: Yup.string()
                .required("Required")
                .oneOf([Yup.ref("password"), null], "Passwords do not match"),
        }),
        onSubmit: (values) => {
            props.onSubmit(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email..."
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email && (
                    <p className="input-error-validation"> {formik.errors.email} </p>
                )}
            </div>

            <div>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="FirstName..."
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                />
            </div>

            <div>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="LastName..."
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                />
            </div>

            <div>
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password..."
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                <button className="btn-show-password" type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <BiShow /> : <BiHide />}
                </button>
                {formik.errors.password && formik.touched.password && (
                    <p className="input-error-validation"> {formik.errors.password} </p>
                )}
            </div>

            <div>
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm password..."
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                />
                <button className="btn-show-password" type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <BiShow /> : <BiHide />}
                </button>
                {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                    <p className="input-error-validation"> {formik.errors.confirmPassword} </p>
                )}
            </div>

            <button className="btn submit-btn mt-5 mb-3" type="submit"> Sign Up </button>
        </form>
    );
}

export default SignUpForm;
