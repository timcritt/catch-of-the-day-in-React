import React from 'react';
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base"

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };
  componentDidMount() {
    //reload local storage
    const localStorageRef = localStorage.getItem(`${this.props.match.params.storeId}`);
    if(localStorageRef) {
      this.setState( {order: JSON.parse(localStorageRef)} );
    }

    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'

    });
    console.log("Mounted!");
  }
  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  

  addFish = (fish) => {
    //update a piece of state
    //1. take a copy of the existing state (to avoid muting original)
    const fishes = { ...this.state.fishes };
    //2. add new fish to fishes variable
    fishes[`fish${Date.now()}`] = fish;
    //3 set the new fishes object to state
    this.setState({
      fishes: fishes
    })
  };
  updateFish = (fishIndex, updatedFish) => {

    console.log("updating fish");
    const fishes = {...this.state.fishes};
    fishes[fishIndex] = updatedFish;
    this.setState({ fishes: fishes});
  }

  deleteFish = (key) => {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes });
  }

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
  };

  addToOrder = (key) => {
    const order = {...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="FRESH SEAFOOD MARKET"/>
          <ul className="fishes">
            {Object.keys(this.state.fishes)
              .map(key => 
                <Fish 
                  key={key} 
                  index={key}
                  details={this.state.fishes[key]} 
                  addToOrder={this.addToOrder} 
                />
              )}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory 
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes} 
          fishes={this.state.fishes}
          />
        
      </div>
    )
  }
}


export default App;