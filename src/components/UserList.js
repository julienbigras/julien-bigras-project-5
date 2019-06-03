import React, { Component } from 'react';

class UserList extends Component {
    render() {
        return (
            <div className="userList">
                
                <div className="buttons">
                    <button onClick={this.props.saveListToFirebase}>save list</button>
                    <button onClick={this.props.clearList}>clear list</button>
                </div>

            </div>
        )
    }
}

export default UserList;