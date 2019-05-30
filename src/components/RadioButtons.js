import React, { Component } from 'react';

class RadioButtons extends Component {
    render() {
        return (
            <div>
                <form action="">

                <input onClick={this.props.getChoiceValue} type="radio" id="drums" name="drumGear" value="drumsArray"/>
                <label htmlFor="drums">Drums</label>

                <input onClick={this.props.getChoiceValue} type="radio" id="cymbals" name="drumGear" value="cymbalsArray" />
                <label htmlFor="cymbals">Cymbals</label>

                <input onClick={this.props.getChoiceValue} type="radio" id="hardware" name="drumGear" value="hardwareArray" />
                <label htmlFor="hardware">Hardware</label>

                <input onClick={this.props.getChoiceValue} type="radio" id="accessories" name="drumGear" value="accessoriesArray" />
                <label htmlFor="accessories">Accessories</label>

                </form>
            </div>
        )
    }
}

export default RadioButtons;

// when user selects a radio button, the value will correspond to an array of drum items, which will populate a dropdown menu