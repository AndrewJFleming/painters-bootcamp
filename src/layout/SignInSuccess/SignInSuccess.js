import React from 'react';
import { Container } from 'reactstrap';
import classes from './SignInSuccess.module.css';

const SignInSuccess = (props) => {

        return(
            <Container className={classes.Container}>
                <h4>Thanks for signing in</h4>
            </Container>
        )
    }

export default SignInSuccess;