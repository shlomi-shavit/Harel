import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// Styles
import classes from './login.module.scss';
// Package
import { useForm } from 'react-hook-form';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../../redux/actions';


const Login = () => {

    const history = useHistory();

    const { register, errors, handleSubmit } = useForm({
        mode: "all"
    });

    // Extract isLogged selector
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();

    // Submit button handler
    const onSubmit = values => {
        dispatch(signIn());
        history.push("/home");
        // console.log(values);
    }

    const errorStyle = (field) => {
        return field ? classes.error : '';
    }

    return (
        <div>
            {isLogged ?
                <div className={classes.login_status}>
                    מחובר
                    <br />
                    עבור ל<Link to='/home'>עמוד משתשמשים</Link>
                </div>
                :

                <form className={classes.wrapper} onSubmit={handleSubmit(onSubmit)}>

                    <div className={classes.field_wrap}>
                        <label htmlFor='email'>
                            <input
                                className={errorStyle(errors.email)}
                                placeholder='מייל'
                                name='email'
                                id='email'
                                ref={register({
                                    required: 'הזינו מייל',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: 'מייל לא תיקני'
                                    }
                                })}
                            />
                        </label>
                        <div className={classes.error_message}>
                            {errors.email ? errors.email && errors.email.message : null}
                        </div>
                    </div>

                    <div className={classes.field_wrap}>
                        <label htmlFor='name' className={`${classes.label_wrapper} ${classes.border_buttom}`}>
                            <input
                                className={errorStyle(errors.name)}
                                placeholder='שם פרטי'
                                name='name'
                                id='name'
                                ref={register({
                                    required: 'הזינו שם פרטי',
                                    pattern: {
                                        value: /^[a-zA-Z\-\u0590-\u05FF''())/ ]+$/,
                                        message: 'טקסט לא חוקי'
                                    }
                                })}
                            />
                            <div></div>
                        </label>
                        <div className={classes.error_message}>
                            {errors.name ? errors.name && errors.name.message : null}
                        </div>
                    </div>

                    <div className={classes.field_wrap}>
                        <label htmlFor='last_name' className={`${classes.label_wrapper} ${classes.border_buttom}`}>
                            <input
                                className={errorStyle(errors.last_name)}
                                placeholder='שם משפחה'
                                name='last_name'
                                id='last_name'
                                ref={register({
                                    required: 'הזינו שם משפחה',
                                    pattern: {
                                        value: /^[a-zA-Z\-\u0590-\u05FF''())/ ]+$/,
                                        message: 'טקסט לא חוקי'
                                    }
                                })}
                            />
                            <div></div>
                        </label>
                        <div className={classes.error_message}>
                            {errors.last_name ? errors.last_name && errors.last_name.message : null}
                        </div>
                    </div>

                    <div className={classes.field_wrap}>
                        <label htmlFor='password' className={`${classes.label_wrapper} ${classes.border_buttom}`}>
                            <input
                                className={errorStyle(errors.password)}
                                placeholder='סיסמא'
                                name='password'
                                id='password'
                                type='password'
                                maxLength='15'
                                ref={register({
                                    required: 'הזינו סיסמא',
                                    pattern: {
                                        value: /^[A-Za-z]\w{7,14}$/,
                                        message: 'הסיסמא חייבת להכיל לפחות 6 ספרות'
                                    }
                                })}
                            />
                        </label>
                        <div className={classes.error_message}>
                            {errors.password ? errors.password && errors.password.message : null}
                        </div>
                    </div>

                    <button className={classes.custom_btn} disabled={Object.keys(errors).length !== 0} type='submit'>
                        כניסה
                </button>
                </form>
            }
        </div>
    );
};

export default Login;