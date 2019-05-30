import React, { Component } from 'react';

class UserList extends Component {
    render() {
        return (
            <div className="userList">
                
                <input type="checkbox" id="test" />
                <label htmlFor="test">test</label>

                <input type="checkbox" id="test" />
                <label htmlFor="test">test</label>

            </div>
        )
    }
}

export default UserList;

// the userList will include the items clicked on by the user in the dropdown menu
// append them to the userList class as input[type=checkbox]
// for each item on the userList, include a button that will allow the user to remove the item

// two buttons at the bottom; one to save the list to Firebase, and one to clear all entries on the list