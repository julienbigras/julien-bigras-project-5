import React, { Component } from 'react';
import firebase from './firebase';
import RadioButtons from './components/RadioButtons';
// import DropdownMenu from './components/DropdownMenu';
import UserList from './components/UserList';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      // drumEquipment: [],
      drumsArray: [],
      cymbalsArray: [],
      hardwareArray: [],
      accessoriesArray: [],
      categoryChoiceArray: [],
      // dropdownMenu: [],
      userPackingList: []
    }
  }

  componentDidMount() {
    // saving a reference to the gear node in dbRefGetInfo
    const dbRefGetInfo = firebase.database().ref('/drumEquipment');
    
    // Basic usage of .once() to read the data located at ref.
    // get everything that exists at the drumEquipment node of the Firebase database
    dbRefGetInfo.once('value', (dataSnapshot) => {
      // handle read data.
      const drums = dataSnapshot.child('drums').val();
      const cymbals = dataSnapshot.child('cymbals').val();
      const hardware = dataSnapshot.child('hardware').val();
      const accessories = dataSnapshot.child('accessories').val();
      console.log(dataSnapshot.val(), drums, cymbals, hardware, accessories);

      this.setState({
        drumsArray: drums,
        cymbalsArray: cymbals,
        hardwareArray: hardware,
        accessoriesArray: accessories
      })
    });

    const dbRefSendInfo = firebase.database().ref('/userLists');

  }

  getChoiceValue = (event) => {
    const targetedValueOfRadioButton = event.target.value;
    const categoryChoiceArrayCopy = [...this.state[targetedValueOfRadioButton]];
    console.log('it worked', event.target.value);

    // changes the state of categoryChoiceArray from an empty array to the value of categoryChoiceArrayCopy, which corresponds to the radio input chosen by the user
    this.setState({
      categoryChoiceArray: categoryChoiceArrayCopy
    })
  }

  // don't need to pass in event as an argument, because there is no default event to prevent, as the handleClick function is attached to an li element
  handleClick = (nameOfObject) => {

    // creates a clone of the original userPackingList array, and saves it to a variable
    // const userPackingListItems = Array.from(this.state.userPackingList) would work the same as below
    const userPackingListItems = [...this.state.userPackingList];

    // when the list items are clicked by the user, push them to the cloned array saved to userPackingListItems variable
    userPackingListItems.push(nameOfObject);

    // changes the state of userPackingList from an empty array to the value of userPackingListItems, which has been populated by the list items clicked by the user
    this.setState({
      userPackingList: userPackingListItems
    })
  }

  removeItemFromList = (drumEquipmentKey) => {
    //here we create a reference to the database at the book's id
    // const dbRef = firebase.database().ref('/userLists');

    dbRef.remove();
  }

  saveListToFirebase = () => {

  }

  render() {
    return (
      <div className="App">
        <h1>hello</h1>

        <RadioButtons getChoiceValue={this.getChoiceValue} />

        {this.state.categoryChoiceArray.map((choice) => {
          return (
            <ul key= { choice.key }>
              <li onClick={() => this.handleClick(choice.title)}>{choice.title}</li>
            </ul>
          )
        })}

        {this.state.userPackingList.map((packingListItem) => {
          return (
            <div>
              <input type="checkbox" id={packingListItem.key}/>
              <label htmlFor={packingListItem.key}>{packingListItem}</label>
              <button onClick={() => this.removeItemFromList(choice.key)}>remove item</button>
            </div>
            )
        })}

        {/* <DropdownMenu /> */}
        <UserList />
      </div>
    );
  }
}

export default App;