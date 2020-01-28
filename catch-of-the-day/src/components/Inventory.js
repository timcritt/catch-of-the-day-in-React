import React from 'react';
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import PropTypes from 'prop-types';
import Login from "./Login";
import base, { firebaseApp } from '../base';
import firebase from 'firebase'

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  }
  authHandler = async (authData) => {
    //1. Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    //2. claim it if there is no owner (implies the user just created it)
    if(!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    //3. set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  }

  render() {

    const logout = <button onClick={this.logout}>Log Out</button>

    //1. check if logged in
    if(!this.state.uid) {
      return <Login authenticate={this.authenticate}/>
    }
    //check if is the owner
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>This isn't your store. Login failed.</p>
          {logout}
        </div>
      );
    }
    //must be the owner. So now render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map( key => 
          <EditFishForm 
            key ={key}
            index={key} 
            fish={this.props.fishes[key]} 
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        )}
        <AddFishForm addFish = {this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>Load sample Fishes</button>
      </div>
    );
  }
} 


export default Inventory;