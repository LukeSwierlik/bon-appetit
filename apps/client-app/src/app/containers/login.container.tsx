import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginAction } from '../+state/auth/auth.actions';

type FormData = {
    email: string;
    username: string;
}

export const LoginContainer = () => {
    const { handleSubmit, register, errors } = useForm<FormData>();
    const dispatch = useDispatch();

    const onSubmit = values => {
        console.log(values);
        const { email, password } = values;

        dispatch(loginAction(email, password));
    };

    return (
        <section className="container mt-2">
            <div className="card mx-auto" style={{maxWidth: '380px'}}>
                <div className="card-body">
                    <h4 className="card-title mb-4">Zaloguj się</h4>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <a href="#" className="btn btn-facebook btn-block mb-2">
                            <i className="fab fa-facebook-f"/> &nbsp;  Sign in with Facebook
                        </a>

                        <a href="#" className="btn btn-google btn-block mb-4">
                            <i className="fab fa-google"/> &nbsp;  Sign in with Google
                        </a>

                        <div className="form-group">
                            <input
                                ref={register}
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                type="email"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                ref={register}
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                type="password"
                            />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Zaloguj</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="mx-auto" style={{maxWidth: '580px'}}>
                <p className="text-center mt-4">Nie masz konta? <a >Zarejestruj się</a></p>
                <br/>
            </div>
        </section>
    );
};
