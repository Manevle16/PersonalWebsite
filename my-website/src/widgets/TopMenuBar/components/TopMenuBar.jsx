import React from "react";
import {Navbar, Nav } from "react-bootstrap";

export default class TopMenuBar extends React.Component{
    render() {
        return(
            <Navbar expand="lg">
                <Navbar.Brand>
                    Home
                </Navbar.Brand>
                <Navbar.Collapse>
                    <Nav variant="tabs" defaultActiveKey="Test">
                        <Nav.Item>
                            <Nav.Link eventKey="Test">Test</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="Test2" >Test 2</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}