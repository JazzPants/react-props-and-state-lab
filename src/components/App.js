import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all',
        // description: 'random',
        // hello: 'world'
      }
    }
  }

  onChangeType = ({target: {value}}) => { //event.target.value
    //change state on filters type
    // ...this.state.filters, spread operator for more than one nested property/state
    //or object in object like below because there is 
    //only one property in filters otherwise it will replace all properties in filters with only one, called "type"
    this.setState(
      {filters: {
        // ...this.state.filters, copy all properties then override type with new value
        type: value
      }
    }
    )
  }

  //get pets.js objects
  fetchPets = () => {
    //fetch all pets
    let endpoint = '/api/pets'
    if(this.state.filters.type !== "all") { //double check URLs for failed get/post requests!
      endpoint = endpoint + "?type=" + this.state.filters.type
    }

    fetch(endpoint)
    .then(res => res.json())
    .then(pets => this.setState({
      pets: pets
    }))
  }

  //check if pet chosen has already been adopted
  onAdoptPet = (petId) => {
    const pets = this.state.pets.map(pet => {
      return pet.id === petId ? {...pet, isAdopted: true} : pet
    })
    /* Other way of writing this if statement
    if (pet.id === petId) {
      return {...pet, isAdopted: true}
    } else {
      return pet
    }
    */
    this.setState({//first level of the object, react will copy over, but you can still use spread operator ...
      pets: pets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType ={this.onChangeType} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              {/* 
              onAdoptPet function changes isAdopted to true
              Pass the pets array we fetched to Petbrowser using a pets prop */}
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
