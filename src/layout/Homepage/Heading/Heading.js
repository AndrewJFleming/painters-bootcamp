import React, {Component} from 'react';
import { Button, Navbar, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, Collapse, Container, Card, CardImg, CardTitle, CardSubtitle, CardBody, Badge, NavbarToggler, DropdownItem } from 'reactstrap';
import ArticleCard from '../../../components/ArticleCard/ArticleCard';
import { connect } from 'react-redux';
import firebase from '../../../config/firebase';
import { Link } from 'react-router-dom';
import { auth } from 'firebase';

import classes from './Heading.module.css';

class Heading extends Component {
    constructor(props) {
        super(props);
        this.state={
            isOpen: false
        }
    }

    toggle= () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(!nextProps.auth.isEmpty){
            firebase.auth().currentUser.getIdTokenResult()
                .then(claim => {
                    console.log(claim)
                })
        }
    }

    render() {
        return(
            <Navbar expand="md" className={classes.Navbar}>
                <NavbarBrand tag={Link} to="/" className={classes.NavbarBrand}>Painter's Bootcamp</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link to="/new-article" className={classes.Link}>New Article</Link>
                        </NavItem>
                    </Nav>
                    <div style={{color: "#000000"}}>
                        {
                            this.props.auth.isEmpty ?
                            '':
                            this.props.auth.displayName
                        }
                    </div>
                    <UncontrolledDropdown>
                        <DropdownToggle nav caret className={classes.DropdownToggle}>
                            Options
                        </DropdownToggle>
                        <DropdownMenu right className={classes.DropdownMenu}>
                            {
                                this.props.auth.isEmpty ?
                                    <DropdownItem className={classes.DropdownItem}>
                                        <Link to={{pathname: '/login'}} className={classes.Link}>
                                            Login
                                        </Link>
                                    </DropdownItem>
                                    :
                                    <DropdownItem className={classes.DropdownItem}>
                                        <Button onClick={() => firebase.auth().signOut()} className={classes.Button}>
                                            Logout
                                        </Button>
                                    </DropdownItem>
                            }
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Collapse>
            </Navbar>
        )
    }
}

const enhance = connect(
    ({firebase: {auth, profile}}) => ({
        auth,
        profile
    })
)

export default enhance(Heading);