import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import Authentication from 'modules/authentication/authentication';
import Http from 'modules/ajaxCalls';

import { connect } from 'react-redux';

const mapStateToProps = store => ({ user: store.login.user });

//this should be a view
class HeaderLinks extends Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
        this.state= { logout: false };
    }
    logout(){
        if(!Authentication.removeToken()){
            this.setState({logout: true});
        }else
            console.error('Fail on logout');
    }
    render(){
        if(this.state.logout){
            return <Redirect to="/login" />;
        }
        const notification = (
            <div>
                <i className="fa fa-globe"></i>
                <b className="caret"></b>
                <span className="notification">5</span>
                <p className="hidden-lg hidden-md">Notification</p>
            </div>
        );
        return (
            <div>
                <Nav>
                    <NavItem eventKey={1} href="#">
                        <i className="fa fa-dashboard"></i>
                        <p className="hidden-lg hidden-md">Dashboard</p>
                    </NavItem>
                    <NavDropdown eventKey={2} title={notification} noCaret id="basic-nav-dropdown">
                        <MenuItem eventKey={2.1}>Notification 1</MenuItem>
                        <MenuItem eventKey={2.2}>Notification 2</MenuItem>
                        <MenuItem eventKey={2.3}>Notification 3</MenuItem>
                        <MenuItem eventKey={2.4}>Notification 4</MenuItem>
                        <MenuItem eventKey={2.5}>Another notifications</MenuItem>
                    </NavDropdown>
                    <NavItem eventKey={3} href="#">
                        <i className="fa fa-search"></i>
                        <p className="hidden-lg hidden-md">Search</p>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    {
                        this.props.user ? (
                            <NavDropdown eventKey={2} title={ this.props.user.displayname } id="basic-nav-dropdown-right">
                                <MenuItem eventKey={2.1}>Action</MenuItem>
                                <MenuItem eventKey={2.2} href="/login">Another action</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={2.3} onClick={this.logout}>Log Out</MenuItem>
                            </NavDropdown>
                        ) : (
                            <NavItem eventKey={3} href="/login">Log In</NavItem>
                        )
                    }
                </Nav>
            </div>
        );
    }
}

export default connect(mapStateToProps)( HeaderLinks );
