import React, { Component } from 'react';
import firebase from './firebase';
import RadioButtons from './components/RadioButtons';
import dropdownMenu from './components/DropdownMenu';
import UserList from './components/UserList';
import './App.css';
import DropdownMenu from './components/DropdownMenu';

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
      dropdownMenu: [],
      userPackingList: [],
      userChoiceValue: ''
    }
  }

  componentDidMount() {
    // saving a reference to the gear node in dbRef
    const dbRef = firebase.database().ref('/drumEquipment');
    
    // Basic usage of .once() to read the data located at ref.
    // get everything that exists at the gear node
    dbRef.once('value', (dataSnapshot) => {
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
        console.log(this.state.drumsArray);
      });
  }

  getChoiceValue = (event) => {
    const targetedCopy = event.target.value;
    const gearCopy = [...this.state[targetedCopy]];
    console.log('it worked', event.target.value);

    this.setState({
      categoryChoiceArray: gearCopy
    })
  }

  handleClick = (event) => {
    event.preventDefault();
    console.log('click');
  }

  render() {
    return (
      <div className="App">
        <h1>hello</h1>

        <button onClick={this.handleClick}>plz clk</button>

        <RadioButtons getChoiceValue={this.getChoiceValue} />
        <DropdownMenu />

          {this.state.categoryChoiceArray.map((choice) => {
            return (
              <ul>
                <li>{choice.title}</li>
              </ul>
            )
          })}

        <UserList />
      </div>
    );
  }
}

export default App;


// componentDidMount() {
//   // grabbing a reference to the values in our database
//   const dbRef = firebase.database().ref();
// }


// change the json file so that all the equipment categories will be within the same node
//create another node that will be called userLists and will be empty
// upload to firebase

//using the dataSnapshot once() method, set the state to hold each array of equipment
// create a variable in state that will hold the user choice at any given time

