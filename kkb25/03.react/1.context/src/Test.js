import React from 'react'

class ListOfWords extends React.PureComponent {
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    console.log('words', this.props.words)
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // 这部分代码很糟，而且还有 bug
    const words = this.state.words;
    console.log(words)
    words.push('marklar');
    console.log(words)
    this.setState({words: words});
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>点击我</button>
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}
/* Test.prototype = new React.Component()
Test.isReactComponent = {}
Test.prototype.render = function () {
  return <div>看到这说明你模拟类组件成功了</div>
} */
export default WordAdder