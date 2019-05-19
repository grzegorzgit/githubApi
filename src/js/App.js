import React, { Component } from 'react';
import Header from './Header';
import '../scss/app.scss';
import Repositories from './Repositiories';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      repos: null,
      user: null,
      reposLoader: 'hidden'
    }


    this.loadRepos = this.loadRepos.bind(this)
  }

  loadRepos(user) {

    this.setState({user: user, reposLoader: 'visible'})

    const url = `https://api.github.com/users/${user}/repos`;
    let loaded_repos = [];
    let _that = this;
    

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                let repos = JSON.parse(xmlhttp.responseText);
                repos.forEach(repo => {
           
                  let filtered_repo = (({ name, created_at, updated_at, forks }) => ({ name, created_at, updated_at, forks }))(repo)
                  loaded_repos.push(filtered_repo)  
                })
 

                _that.setState({
                  repos: loaded_repos,
                  reposLoader: 'hidden'
                })
                

            } else {
                alert('There was a problem loading the results.')
            }
        }
    };
    xmlhttp.send(null); 

 
      
  }

  render() {
    return (
      <div className="App">
        <Header loadRepos={this.loadRepos} />
        <Repositories repos={this.state.repos} user={this.state.user} reposLoader={this.state.reposLoader}/>
      </div>
    );
  }
} 