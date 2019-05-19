import React, { Component } from 'react';
import '../scss/header.scss'


export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            companyname: null
        }

        this.inputVal = this.inputVal.bind(this);
        this.loadRepos  = this.loadRepos.bind(this);
    }

    inputVal(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    loadRepos(e){
        e.preventDefault();
        this.props.loadRepos(this.state.username)
    }
  
    render() {
        return (
            <header>
                <form onSubmit={this.loadRepos}>
                    <div className="inputs">
                        <h1>Please provide a username or company name:</h1>
                        <input type="text" placeholder="User name" name="username" id="username" onChange={this.inputVal} /> 
                        <button type="submit" onClick={this.loadRepos}>Get repositories</button>
                    </div>
                </form>
            </header>
        )
    }

}