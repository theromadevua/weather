import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "../../../store/store";
import useAuthForm from "../hooks/useAuthForm";

const Register = () => {
    const { isAuth } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const {sendFormData, password, email, handleEmailInput, handlePasswordInput} = useAuthForm()

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);

    return (
        <div className="login auth-form">
            <h1>Login</h1>
            <div className="inputs-container">
                <input
                    placeholder="email"
                    value={email}
                    type="email"
                    onChange={handleEmailInput} />
                <input
                    placeholder="password"
                    value={password} type="password"
                    onChange={handlePasswordInput}/>
            </div>
            <div className="auth-form__links">
                <NavLink className="auth-form__link" to={"/register"}>
                    register
                </NavLink>
                <NavLink className="auth-form__link" to={"/reset-password-request"}>
                    forgot password?
                </NavLink>
            </div>
            <button className={"auth-form__button"} onClick={sendFormData}>
                Login
            </button>

        </div>
    );
};

export default Register;