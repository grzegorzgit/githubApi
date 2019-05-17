import React, { Component } from 'react';
import '../scss/repositories.scss';
import Branches from './Branches';

export default class Repositories extends Component {

    render() {
        return (
            <main>
                <div className="repos">
                    <div className="repos_header">
                        <div className="repos_name">repository</div>
                        <div className="repos_created">created</div>
                        <div className="repos_updated">last updated</div>
                        <div className="repos_forks">forks</div>
                    </div>
                    <ul className="repos_list">
                        <li className="repos_item">
                            <div className="repos_name">Asdf</div>
                            <div className="repos_created">01-01-2019</div>
                            <div className="repos_updated">20-01-2018</div>
                            <div className="repos_forks">17</div>
                        </li> 
                        <li className="repos_item">
                            <div className="repos_name">Asdf</div>
                            <div className="repos_created">01-01-2019</div>
                            <div className="repos_updated">20-01-2018</div>
                            <div className="repos_forks">17</div>
                            <Branches />
                        </li> 
                        <li className="repos_item">
                            <div className="repos_name">Asdf</div>
                            <div className="repos_created">01-01-2019</div>
                            <div className="repos_updated">20-01-2018</div>
                            <div className="repos_forks">17</div>
                        </li> 
                        <li className="repos_item">
                            <div className="repos_name">Asdf</div>
                            <div className="repos_created">01-01-2019</div>
                            <div className="repos_updated">20-01-2018</div>
                            <div className="repos_forks">17</div>
                        </li> 
                        <li className="repos_item">
                            <div className="repos_name">Asdf</div>
                            <div className="repos_created">01-01-2019</div>
                            <div className="repos_updated">20-01-2018</div>
                            <div className="repos_forks">17</div>
                        </li> 
                        <li className="repos_item">
                            <div className="repos_name">Asdf</div>
                            <div className="repos_created">01-01-2019</div>
                            <div className="repos_updated">20-01-2018</div>
                            <div className="repos_forks">17</div>
                        </li> 
                    </ul>
                </div>
            </main>
        );
    }
}

