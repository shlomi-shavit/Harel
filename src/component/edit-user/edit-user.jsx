import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Style
import classes from '../login/login.module.scss';
// Packages
import axios from 'axios';
import { useForm } from "react-hook-form";
// Redux
import { useSelector } from 'react-redux';

const Edit = () => {

    const { register, errors, handleSubmit } = useForm({
        mode: "all"
    });

    // Extract isLogged selector
    const isLogged = useSelector(state => state.isLogged);

    // Get Data
    const [data, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const users = await axios(
                'https://test-api-server.herokuapp.com/users',
            );
            setUsers(users.data);
        };

        fetchData();
    }, []);

    // User data
    const userID = window.location.search.replace('?', '');
    const currentUser = data[userID] ? data[userID] : '';

    // Send button handler
    const onSubmit = values => {
        console.log('Update DB');
        console.log(values);
    }

    const errorStyle = (field) => {
        return field ? classes.error : '';
    }

    return (

        <div>
            {isLogged ?
                <form className={classes.wrapper} onSubmit={handleSubmit(onSubmit)}>

                    <div className={classes.field_wrap}>
                        <label htmlFor='name' className={classes.label_wrapper}>
                            <input
                                className={errorStyle(errors.name)}
                                placeholder='שם פרטי'
                                name='name'
                                id='name'
                                defaultValue={currentUser.firstName}
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
                        <label htmlFor='last_name' className={classes.label_wrapper}>
                            <input
                                className={errorStyle(errors.last_name)}
                                placeholder='שם משפחה'
                                name='last_name'
                                id='last_name'
                                defaultValue={currentUser.lastName}
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
                        <label htmlFor='password' className={classes.label_wrapper}>
                            <input
                                className={errorStyle(errors.password)}
                                placeholder='סיסמא'
                                name='password'
                                id='password'
                                type='password'
                                maxLength='15'
                                defaultValue='Wa112211'
                                disabled={true}
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

                    <div className={classes.field_wrap}>
                        <label htmlFor='bank_num' className={classes.label_wrapper}>
                            <input
                                className={errorStyle(errors.bank_num)}
                                placeholder='חשבון בנק'
                                name='bank_num'
                                id='bank_num'
                                type='bank-num'
                                maxLength='15'
                                defaultValue='1234566789101112'
                                ref={register({
                                    required: 'הזינו מספר חשבון',
                                    pattern: {
                                        value: /^\s*-?[0-9+]{15,21}\s*$/i, // /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i
                                        message: 'השדה חייבת להכיל לפחות 16 ספרות'
                                    }
                                })}
                            />
                        </label>
                        <div className={classes.error_message}>
                            {errors.bank_num ? errors.bank_num && errors.bank_num.message : null}
                        </div>
                    </div>

                    <div className={classes.button_wrap}>
                        <button disabled={Object.keys(errors).length !== 0} type='submit'>
                            שמירה
                 </button>

                        <Link className={classes.back_btn} to='/home'>חזרה</Link>
                    </div>
                </form>
                :
                <div className={classes.login_status}>
                    לא מחובר
                    <br />
                    עבור ל<Link to='/'>עמוד כניסה</Link>
                </div>
            }
        </div>
    );
};

export default Edit;