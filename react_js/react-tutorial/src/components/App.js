import React from 'react';
import Header from './Header';
import Content from './Content';
import RandomNumber from './RandomNumber';

class App extends React.Component {
  render(){
    return(
      <div>
        <Header title={ this.props.headerTitle }/>
        <Content title={ this.props.contentTitle }
                  body={ this.props.contentBody }/>
        <RandomNumber number={ this.props.value }
                    onUpdate={ this.updateValue }/>
      </div>
    );
  }
}

App.defaultProps = {
    headerTitle: 'Default header',
    contentTitle: 'Default contentTitle',
    contentBody: 'Default contentBody'
};

export default App;
