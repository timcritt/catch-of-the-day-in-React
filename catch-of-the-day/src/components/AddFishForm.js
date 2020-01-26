import React from 'react';

class AddFishForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();
  
  createFish =(event) => {
    event.preventDefault();

    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value), // store in cents
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value
    }

    this.props.addFish(fish);
    //refresh the form
    event.currentTarget.reset();

  }
  
  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name"></input>  
        <input name="price" ref={this.priceRef} type="text" placeholder="Price"></input>  
        <input name="status" ref={this.statusRef} type="text" placeholder="Status"></input>  
        <textarea name="desc" ref={this.descRef} type="text" placeholder="Desc"></textarea>  
        <input name="image" ref={this.imageRef} type="text" placeholder="Image"></input>  
        <button type="submit">+ Add Fish</button>
        </form>
    )
  }  
}
export default AddFishForm;