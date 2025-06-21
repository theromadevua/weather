import { useState } from "react";
import useAuthForm from "../hooks/useAuthForm";
import {NavLink} from "react-router-dom";

const PassResetRequest = () => {
    const {resetPasswordRequest} = useAuthForm()
    const [email, setEmail] = useState<string>('')

    return (
        <div className="auth-form">
            <input type="text" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="Enter your email" />
            <button className="auth-form__button" onClick={() => resetPasswordRequest(email)}>Send Password Reset Link</button>
        </div>
    );
};

export default PassResetRequest;