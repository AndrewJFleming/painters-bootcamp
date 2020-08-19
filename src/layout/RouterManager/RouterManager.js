import React, {Component} from 'react';
import { Container, Card, CardImg, CardTitle, CardSubtitle, CardBody, Badge } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Heading from '../Homepage/Heading/Heading';
import Main from '../Homepage/Main/Main';
import ViewArticle from '../ViewArticle/ViewArticle';
import NewArticle from '../NewArticle/NewArticle';
import LoginPage from '../LoginPage/LoginPage';
import SignInSuccess from '../SignInSuccess/SignInSuccess';

import * as firebase from 'firebase';

const AdminOnly = (ComposedComponent, auth) => {
    class AdminOnly extends Component{
        constructor(props) {
            super(props);
            this.state={
                isPass: false
            }
        }

        componentWillMount() {
            if(!auth.isEmpty){
                firebase.auth().currentUser.getIdTokenResult()
                    .then((idTokenResult) => {
                        if(idTokenResult.claims.type === 'administrator'){
                            this.setState({
                                isPass: true
                            })
                        } else {
                            this.props.history.push('/login')
                        }
                    })
            } else {
                this.props.history.push('/login')
            }
        }

        render() {
            if(this.state.isPass){
                return <ComposedComponent location={this.props.location} history={this.props.history} auth={auth}/>
            } else {
                return(
                    <div>
                        Checking...
                    </div>
                )
            }
        }

    }
    return AdminOnly
}

class RouterManager extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    
    render() {
        return(
            <div>
            <Heading/>

            {
                this.props.auth.isLoaded?
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/article/:id" component={ViewArticle}/>
                <Route path="/new-article" component={AdminOnly(NewArticle, this.props.auth)}/>
                <Route path="/sign-in-success" component={SignInSuccess}/>
            </Switch>
            : ''
            }

            </div>
        )
    }
}

const enhance = connect(
    ({firebase: {auth, profile}}) => ({
        auth,
        profile
    })
)

export default enhance(withRouter(RouterManager));