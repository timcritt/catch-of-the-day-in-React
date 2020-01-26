import React from 'react';
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

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
                  addToOrder={this.addToOrder} />)}
          </ul>
        </div>
        <Inventory addFish={this.addFish}loadSampleFishes={this.loadSampleFishes} />
        <Order fishes={this.state.fishes} order={this.state.order} />
      </div>
    )
  }
}


export default App;