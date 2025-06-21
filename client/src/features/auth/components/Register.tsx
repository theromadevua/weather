import { NavLink, useNavigate } from "react-router";
import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../../store/store";
import useAuthForm from "../hooks/useAuthForm";

const Register = () => {
    const { isAuth } = useAppSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const {setType, password, email, setEmail, setPassword, sendFormData, handleEmailInput, handlePasswordInput} = useAuthForm()

    useEffect(() => {
        setType('register');

        if (isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);

    return (
        <div className="auth-form">
            <h1>Register</h1>
            <div className="inputs-container">
                <input placeholder="email"
                       value={email}
                       type="email"
                       onChange={handleEmailInput}/>
                <input
                    placeholder="password"
                    value={password}
                    type="password"
                    onChange={handlePasswordInput}/>
            </div>
            <div className="auth-form__links">
                <NavLink className="auth-form__link" to={"/login"}>
                    login
                </NavLink>
                <NavLink className="auth-form__link" to={"/reset-password-request"}>
                    forgot password?
                </NavLink>
            </div>
            <button className="auth-form__button" onClick={sendFormData}>
                REGISTER
            </button>
        </div>
    );
};

export default Register;