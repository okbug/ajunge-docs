import React, { Component } from 'react'

export default class Profile extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <p>Profile</p>
            </div>
        )
    }
}
/**
{
    history: {…},
    location: {…},
    match: {…}
 */