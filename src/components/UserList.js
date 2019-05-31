import React, { Component } from 'react';

class UserList extends Component {
    render() {
        return (
            <div className="userList">
                
                <button onClick={this.props.saveListToFirebase}>save list</button>
                <button onClick={this.props.clearList}>clear list</button>

            </div>
        )
    }
}

export default UserList;

// the userList will include the items clicked on by the user in the dropdown menu
// append them to the userList class as input[type=checkbox]
// for each item on the userList, include a button that will allow the user to remove the item

// two buttons at the bottom; one to save the list to Firebase, and one to clear all entries on the list