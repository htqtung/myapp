import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { firebaseAuth } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    state = { email: '', password: '', redirect: false };

    resetPassword = (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        firebaseAuth().sendPasswordResetEmail(email).then(function () {
            toast.success("Password reset email sent.", {
                position: toast.POSITION.TOP_RIGHT
            });
        }).catch(function (error) {
            toast.error("Error in resetting password. Type your email to email field.", {
                position: toast.POSITION.TOP_RIGHT
            });
        });
    }

    onLoginClick = (event) => {
        event.preventDefault();

        const { email, password } = this.state;
        firebaseAuth().signInWithEmailAndPassword(email, password)
            .then(() => {
                // Redirect 
                this.setState({ redirect: true });
            })
            .catch(() => {
                // No account found. Create a new one and send verification email
                firebaseAuth().createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        var user = firebaseAuth().currentUser;
                        user.sendEmailVerification().then(function () {
                            toast.success("Verification email sent.", {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        }).catch(function (error) {
                            toast.error("Error in authentication.", {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        });
                    })
                    .catch(() => {
                        toast.error("Could not login. Check your email and password.", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    });
            });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to='/' />);
        }

        return (
            <div className="container py-5">
                <form>
                    <TextField name="email" hintText="email@domain.com"
                        onChange={this.handleChange}

                    />
                    <br/>
                    <TextField name="password"
                        hintText="Password Field"

                        type="password"
                        onChange={this.handleChange}

                    />
                    <br/>
                    <RaisedButton onClick={this.resetPassword} className="float-left" default={true} label="Forgot password?" />
                    <RaisedButton onClick={this.onLoginClick} className="float-right" primary={true} label="Login" />
                </form>
                <ToastContainer />
            </div>
        );
    }
}

export default Login;