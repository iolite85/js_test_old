import React from 'react';

class RandomNumber extends React.Component {
  updateNumber() {
    let randomValue = Math.round(Math.random()*100);
    this.updateValue(randomValue);
  }

  constructor(props){
    super(props);
    this.state = {
      value: Math.round(Math.random()*100)
    };
    //updateNumber:() => {}
    this.updateNumber = this.updateNumber.bind(this);
  }

  updateValue(randomValue){
    this.setState({
        value: randomValue
    });
  }

  render(){
    return(
      <div>
        <h1>RANDOM NUMBER: { this.state.value }</h1>
        <button onClick={this.updateNumber}>Randomize</button>
      </div>
    );
  }

}

export default RandomNumber;
