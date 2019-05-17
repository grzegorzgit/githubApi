import React, { Component } from 'react';
import '../scss/branches.scss'; 

export default class Branches extends Component {
 
    render(){
        return <div className="branches">
            <span>master</span>
            <span>development</span>
            <span>new-feature</span>
        </div>
    }
}