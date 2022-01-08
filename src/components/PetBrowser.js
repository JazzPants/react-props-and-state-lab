import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  render() {
      //loop through pet array data and for each pet, render a pet component
    const petComponent = this.props.pets.map((pet, i) => ( //use array index for identification "i"
    <Pet key={i} pet={pet} onAdoptPet={this.props.onAdoptPet}></Pet>)
    )
    return <div className="ui cards">{petComponent}</div>
  }
}

export default PetBrowser
