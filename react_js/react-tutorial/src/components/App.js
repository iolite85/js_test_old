import React from 'react';

class App extends React.Component {
  sayHey(){
    alert("hey");
  }

  render(){
    let text = "Dev-Server";
    let pStyle = {
        color: 'aqua',
        backgroundColor: 'black'
    };
    return(
      <div>
      { /* 컴포넌트에서 여러 Element를 렌더링 해야 할 때 element들은 container element(하나의 element) 안에 포함시켜줘야함. 주석도 container element 안에 작성되어야 함. 단 주석은 브라우저상 source에 나타나지 않음   */ }
        <h1>Hello React Skeleton</h1>
        <h2>Welcome to {text}</h2>
        <button onClick={this.sayHey}>Click Me</button>
        <p style = {pStyle}>{1 == 1 ? 'True' : 'False' }</p>
      </div>
    );
  }
}

export default App;
