import React, { Component } from 'react';
import '../scss/header.scss'


export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        }

        this.inputVal = this.inputVal.bind(this);
        this.loadRepos = this.loadRepos.bind(this);
    }

    // Update input value.
    inputVal(e) {
        this.setState({
            user: e.target.value
        })
    }

    // Invoked on form submit, loading repositoreis.
    loadRepos(e) {
        e.preventDefault();
        this.props.loadRepos(this.state.user)
    }

    // Update value of input, invoked when url hash is changed.
    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.state.user) {
            this.setState({ user: nextProps.user });
          }
    }

    render() {
        return (
            <header>
                <form onSubmit={this.loadRepos}>
                    <div className="inputs">
                        <h1>Please provide a username or company name:</h1>
                        <input type="text" placeholder="User name" name="username" id="username" onChange={this.inputVal} value={(this.state.user) ? this.state.user : ""} />
                        <button type="submit" onClick={this.loadRepos}>Get repositories</button>
                    </div>
                </form>
            </header>
        )
    }

}