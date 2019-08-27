import React from "react";
import {Navbar, Nav, Row, Col, Container} from "react-bootstrap";

export default class TopMenuBar extends React.Component{
    render() {
        return(
            <Navbar expand="lg">
            <Navbar.Collapse>
            <Nav>
                <Nav.Link >Test</Nav.Link>
                <Nav.Link >Test 2</Nav.Link>
            </Nav>
            </Navbar.Collapse>

            </Navbar>
        )
    }
}