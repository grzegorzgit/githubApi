import React, { Component } from 'react';
import '../scss/repositories.scss';

export default class Repositories extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loadDefaultBranchesFor: this.props.loadDefaultBranchesFor
        }

        this.preventHashInputLoop = false;

        this.displayRepos = this.displayRepos.bind(this)
        this.loadBranches = this.loadBranches.bind(this)
        this.fadeInBranches = this.fadeInBranches.bind(this)
        this.loadBranchesFromInput = this.loadBranchesFromInput.bind(this)
        this.hideDisplayedBranches = this.hideDisplayedBranches.bind(this)
    }

    displayRepos() {
        let repos = 'no name provided';

        if (this.props.repos) {
            repos = [];
            this.props.repos.forEach((repo, index) => {
                repos.push(
                    <li key={index + repo.name} className="repos_item">
                        <span className="repos_name" onClick={this.loadBranchesFromInput} data-repo={repo.name}>{repo.name}</span>
                        <span className="repos_loader">loading</span>
                        <div className="repos_branches">
                        </div>
                    </li>
                )
            })
        }
        return repos;
    }

    // This loads branches when user clicked on repository name.
    loadBranchesFromInput(e) {
        // Update the url
        this.setState({ loadDefaultBranchesFor: e.target.dataset.repo })

        // Inpuch change updates the url Hash, url hash change updates the input. This prevents infinite loop.
        this.props.preventHashInputLoop();
        this.preventHashInputLoop = true;

        this.props.changeHash(this.props.user, e.target.dataset.repo)
        this.loadBranches(e.target.dataset.repo)
    }

    // When new props are provided then load new branches
    componentDidUpdate(prevProps) {

        // If only repositories are updated, than hide displayed branches.
        if (this.state.loadDefaultBranchesFor === null) {
            this.hideDisplayedBranches();
        }

        // componentDidUpdate runs before <li> elements are avaiable, this is why this delay is needed.
        setTimeout(() => {
            if (this.props.loadDefaultBranchesFor !== prevProps.loadDefaultBranchesFor && document.querySelector('li')) {
                this.loadBranches(this.props.loadDefaultBranchesFor)
            }
        }, 500);
    }

    // React remembers old branches even after new repositories list is created. This ensures that all the old branches are removed.
    hideDisplayedBranches() {
        document.querySelectorAll('.repos_branches.open').forEach(item => {
            item.classList.remove('open');
            item.classList.add('closed')
            while (item.hasChildNodes()) {
                item.removeChild(item.lastChild);
            }
        })
    }

    // This function is invoked either by clicking on repository name, or after the url hash has been updated.
    loadBranches(repository) {

        this.hideDisplayedBranches();

        if (!repository) { return }

        let branches_block = document.querySelector(`span[data-repo='${repository}']`).parentNode.querySelector('.repos_branches')
        
        // Close any open branches.
        branches_block.classList.remove('closed');
        branches_block.classList.add('open');
        while (branches_block.hasChildNodes()) {
            branches_block.removeChild(branches_block.lastChild);
        }

        branches_block.parentNode.querySelector('.repos_loader').style.display = 'block';

        // Load branches for selected repository.
        let _this = this;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', `https://api.github.com/repos/${this.props.user}/${repository}/branches`, true);
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
                    throw new Error('There was a problem loading branches.')
                }
            }
        };
        xmlhttp.send(null);
    }

    // Show the branches with fade in animation.    
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

