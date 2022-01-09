import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Identicon from "identicon.js"


export default function NavBarComponent() {
    return (
        <Navbar bg="light" expand="sm" >
            <Navbar.Brand as={Link} to="/">
                Blockup
            </Navbar.Brand>
            <Nav>
                <Nav.Link as={Link} to="/user">Profile</Nav.Link>
            </Nav>

            <Nav>
                <ul className="navbar-nav px-3">
                    <li>
                        <small id="account">
                            <a target="_blank"
                                alt=""
                                className="text-white"
                                rel="noopener noreferrer"
                                href={"https://etherscan.io/address/" + this.props.account}>
                                {this.props.account.substring(0, 6)}...{this.props.account.substring(38, 42)}
                            </a>
                        </small>
                        {this.account
                            ? <img
                                alt=""
                                className='ml-2'
                                width='30'
                                height='30'
                                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                            />
                            : <span></span>
                        }
                    </li>
                </ul>
            </Nav>

        </Navbar>
    )
}
