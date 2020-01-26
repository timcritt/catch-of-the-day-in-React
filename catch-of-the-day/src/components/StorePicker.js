import React from "react";
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  myInput = React.createRef();
  
  //if you need to access this inside of a custom metho, use an arrow function
  //or manually bind all the methods inside of a constructor
  goToStore = (event) => {
    //1. prevent page reload
    event.preventDefault();
   
    //2. get the text from that input
    const storeName = this.myInput.current.value;
    //3. change the page to /store/whatever-they-entered
    this.props.history.push(`/store/${storeName}`);
  }
  
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>please enter a store</h2>
        <input 
          type="text"
          ref={this.myInput}
          required 
          placeholder="Store Name" 
          defaultValue={getFunName()} 
        />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

export default StorePicker;

