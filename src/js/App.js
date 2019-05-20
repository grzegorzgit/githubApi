import React, { Component } from "react";
import Header from "./Header";
import Repositories from "./Repositiories";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repos: null,
            user: null,
            reposLoader: "hidden",
            repository: null // When this changes, then Repositories.js loads branches for this repository.
        };
        this.dont_load_after_change = false;

        this.loadRepos = this.loadRepos.bind(this);
        this.changeHash = this.changeHash.bind(this);
        this.loadFromHash = this.loadFromHash.bind(this);
        this.preventHashInputLoop = this.preventHashInputLoop.bind(this);

    }

    changeHash(user, repository) {
        const url = (repository) ? `user=${user}&repository=${repository}` : `user=${user}`;
        this.dont_load_after_change = true;
        window.location.hash = url;
    }

    componentDidMount() {

        if (window.location.hash.length > 2) {
            this.loadFromHash();
        }

        window.addEventListener('hashchange', this.loadFromHash)
    }

    preventHashInputLoop() {
        this.dont_load_after_change = true;
    }

    // If URL contains parameters then load content for them.
    loadFromHash() {

        // Read the url parameters.
        const hash = window.location.hash.substr(1);
        var parameters = hash.split('&').reduce(function (result, item) {
            var parts = item.split('=');
            result[parts[0]] = parts[1];
            return result;
        }, {}); 

        // Load the content only if site has ben refreshed or navigation buttons were used. Dont load if website itself just updated the parameters.
        if (!this.dont_load_after_change && parameters.user !== 'undefined') {
            this.loadRepos(parameters.user, (parameters.repository === undefined) ? null : parameters.repository);
        }
        this.dont_load_after_change = false;
    }

    loadRepos(user, repository = null) {

        this.setState({
            user: user,
            reposLoader: "visible",
            repository: repository
        });

        if (repository) {
        }else{
            this.changeHash(user, repository);
        }

        const url = `https://api.github.com/users/${user}/repos`;
        let loaded_repos = [];
        let _this = this;

        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    let repos = JSON.parse(xmlhttp.responseText);
                    repos.forEach(repo => {
                        loaded_repos.push({ name: repo.name });
                    });

                    _this.setState({
                        repos: loaded_repos,
                        reposLoader: "hidden"
                    });
                } else {
                    _this.setState({
                        reposLoader: "hidden"
                    });

                    alert("There was a problem loading the results.");
                    throw new Error('There was a problem loading repositories.')
                }
            }
        };
        xmlhttp.send(null);
    }

    render() {
        return (
            <div className="App">
                <Header loadRepos={this.loadRepos} user={this.state.user} />
                <Repositories
                    repos={this.state.repos}
                    user={this.state.user}
                    loadDefaultBranchesFor={this.state.repository}
                    reposLoader={this.state.reposLoader}
                    changeHash={this.changeHash}
                    preventHashInputLoop={this.preventHashInputLoop}
                />
            </div>
        );
    }
}
