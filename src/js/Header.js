import React, {Component} from 'react';
import '../scss/header.scss'


export default class Header extends Component {

    render() {
        return(
            <header>
                <div className="inputs">
                    <h1>Please provide a username or company name:</h1>
                    <input type="text" placeholder="User name" name="username" id="username"/>
                    <input type="text" placeholder="Company name" name="companyname" id="companyname"/>
                    <button>Get repositories</button>
                </div>
            </header>
        )
    }

}