import React, { Component } from 'react';
import firebase from './firebase';
import Header from './components/Header';
import RadioButtons from './components/RadioButtons';
import UserList from './components/UserList';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      drumsArray: [],
      cymbalsArray: [],
      hardwareArray: [],
      accessoriesArray: [],
      categoryChoiceArray: [],
      userPackingList: []
    }
  }

  componentDidMount() {
    // saving a reference to the gear node in dbRefGetInfo
    const dbRefGetInfo = firebase.database().ref('/drumEquipment');
    
    // Basic usage of .once() to read the data located at in the Firebase database
    // gets everything that exists at the drumEquipment node of the Firebase database
    dbRefGetInfo.once('value', (dataSnapshot) => {
      // handles the read data, and assigns it to variables
      const drums = dataSnapshot.child('drums').val();
      const cymbals = dataSnapshot.child('cymbals').val();
      const hardware = dataSnapshot.child('hardware').val();
      const accessories = dataSnapshot.child('accessories').val();

      this.setState({
        drumsArray: drums,
        cymbalsArray: cymbals,
        hardwareArray: hardware,
        accessoriesArray: accessories
      })
    });
  }

  getChoiceValue = (event) => {
    const targetedValueOfRadioButton = event.target.value;
    const categoryChoiceArrayCopy = [...this.state[targetedValueOfRadioButton]];

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

  // allows user to remove individual items from the list
  removeItemFromList = (index) => {
    //creates a copy of the userPackingList array, and saves it to a variable
    const packingList = this.state.userPackingList;
    //splices a single item from the array, based on the index number passed in as an argument
    packingList.splice(index, 1);

    this.setState({
      // sets the state of the userPackingList to equal the copy, which was spliced
      userPackingList: packingList
    })
  }

  // pushes the user's finished list to the Firebase database
  saveListToFirebase = () => {
    const dbRef = firebase.database().ref('/userLists');
    dbRef.push(this.state.userPackingList);
  }

  // clears the list
  clearList = () => {
    this.setState({
      // sets the value of the userPackingList back to an empty array
      userPackingList: []
    })
  }

  render() {
    return (
      <div className="App">

        <div className="largeContainer">
          <Header />
          <div className="wrapper">
            <section className="flexContainer">
              <section className="userOptionsSection">

                <h3>Choose a Category:</h3>
                <RadioButtons getChoiceValue={this.getChoiceValue} />

                <ul>
                  {this.state.categoryChoiceArray.map((choice) => {
                    return (
                      <li key= {choice.key}>
                        {choice.title}
                        <button onClick={() => this.handleClick(choice.title)}>add</button>
                      </li>
                    )
                  })}
                </ul>
              </section> {/* closes userOptionsSection */}

              <section className="userSelectionsList">
                <h3>Your Packing List:</h3>

                <UserList saveListToFirebase={this.saveListToFirebase} clearList={this.clearList}/>

                {this.state.userPackingList.map((packingListItem, index) => {
                  return (
                    <div className="userSelectionItem">
                      <label>
                        <input type="checkbox" id={packingListItem.key}/>
                        {packingListItem}
                        <span className="checkmark"></span>
                      </label>
                      <button onClick={() => this.removeItemFromList(index)}>remove</button>
                    </div>
                    )
                })}

              </section> {/* closes userSelectionsList section */}
            </section> {/* closes flex container */}
          </div> {/* closes wrapper */}
        
        </div> {/* closes largeContainer */}

        <footer>
          <p>Created by Julien Bigras</p>
        </footer>

      </div> //closes 'App' div
    );
  }
}

export default App;