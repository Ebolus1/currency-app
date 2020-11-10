import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";


class Header extends React.Component {


    render() {
        return (
            <div className="header">
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand><Link to="/Home/">Home</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link><Link to="/Table/">Currency Table</Link></Nav.Link>
                            <Nav.Link><Link to="/Converter/">Currency Converter</Link></Nav.Link>
                            <Nav.Link>
                            <Link to="/HistoryChart/">History Chart</Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Header;

