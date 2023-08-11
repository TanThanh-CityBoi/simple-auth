import React, { useState } from "react";
import { useFormik } from "formik";
import { BiHide, BiShow } from "react-icons/bi"
import * as Yup from "yup";

function SignInForm(props) {

    const [showPassword, setShowPassword] = useState(false)

    const formik = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: false,
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Email Required"),
            password: Yup.string()
                .required("Password Required")
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    "Password must be minimum eight characters, at least one letter and one number"
                ),
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

            <button className="btn submit-btn mt-5 mb-3" type="submit"> Login </button>
        </form>
    );
}

export default SignInForm;
