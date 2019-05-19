import React, { Component } from 'react';
import '../scss/repositories.scss';
import LoadJson from './LoadJson';

export default class Repositories extends Component {

    constructor(props) {
        super(props);


        this.displayRepos = this.displayRepos.bind(this)
        this.loadBranches = this.loadBranches.bind(this)
        this.fadeInBranches = this.fadeInBranches.bind(this)


        window.onresize = () => {
            this.setState({ 'is_it_mobile': window.outerWidth >= 640 });
        }
    }

    displayRepos() {
        let repos = 'no name provided';

        if (this.props.repos) {
            repos = [];
            this.props.repos.forEach((repo, index) => {
                repos.push(
                    <li key={index} className="repos_item">
                        <span className="repos_name" onClick={this.loadBranches} data-repo={repo.name}>{repo.name}</span>
                        <span className="repos_loader">loading</span>
                        <div className="repos_branches">
                        </div>
                    </li>
                )
            })
        }

        return repos;
    }


    loadBranches(e) {

        let branches_block = e.target.parentNode.querySelector('.repos_branches')

        // Close any other open branch block
        document.querySelectorAll('.repos_branches.open').forEach(item => {
            item.classList.remove('open');
            item.classList.add('closed')
        })

        branches_block.classList.remove('closed');
        branches_block.classList.add('open');

        let _this = this;

        // Load branches if they haven't been loaded yet.
        if (!branches_block.hasChildNodes()) {

            branches_block.parentNode.querySelector('.repos_loader').style.display = 'block';

            let xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET', `https://api.github.com/repos/${this.props.user}/${e.target.dataset.repo}/branches`, true);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4) {
                    if (xmlhttp.status === 200) {
                        let branches = JSON.parse(xmlhttp.responseText);
                        branches.forEach(item => {
                            let span = document.createElement('span')
                            span.innerHTML = item.name;
                            branches_block.appendChild(span)
                        })

                        // Show the branches with fade in animation.
                        branches_block.parentNode.querySelector('.repos_loader').style.display = 'none';
                        _this.fadeInBranches(branches_block.querySelectorAll('span'))

                    } else {
                        alert('There was a problem loading branches.')
                    }
                }
            };
            xmlhttp.send(null);

        }

    }


    fadeInBranches(branches) {
        let branch_index = 0;
        let branches_showing = setInterval(() => {
            if (branches[branch_index]) {
                branches[branch_index].style.opacity = 1;
                branch_index++;
            } else {
                clearInterval(branches_showing)
            }
        }, 150)
    }

    render() {
        return (
            <main>
                <div className="repos">
                    <span className="repos_loader" id="main_loader" style={{ 'visibility': this.props.reposLoader }}>loading</span>
                    <ol className="repos_list">
                        {this.displayRepos()}
                    </ol>

                </div>
            </main>
        );
    }
}

