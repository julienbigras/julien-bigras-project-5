import React, { Component } from 'react';
// import logo from '../assets/drum.svg';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <h1>Gig Essentials</h1>
                {/* <div className="logoPic">
                    <img src={logo} alt="drumsticks"/>
                </div> */}
                <h2>A practical packing guide for drummers everywhere</h2>
            </div>
        )
    }
}

export default Header;