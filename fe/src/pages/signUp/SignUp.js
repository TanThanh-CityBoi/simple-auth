import { Link } from "react-router-dom"
import SignUpForm from "./SigUpForm"
import { userAPI } from "../../api/user.api"
import './signUp.scss'
import { toast } from 'react-toastify';


function SignUp() {
    async function handleSignUp(values) {
        userAPI.signUp(values).then(
            (result) => toast.success(result.data.message || "CREATE SUCCESSFULLY!"),
            (error) => toast.error(error.toString())
        );
    }
    return (
        <div className="sign-up-wrapper d-flex justify-content-center">
            <div className="sign-up-form mt-5 mb-5">
                <h1 className='text-center t-26 font-weight-bold mb-5'>Sign Up</h1>
                <SignUpForm onSubmit={handleSignUp} />
                <p className="t-14 text-center">
                    Already have an account?
                    <Link to="/sign-in" className='sign-in-btn mt-2 ms-2 text-center'>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp