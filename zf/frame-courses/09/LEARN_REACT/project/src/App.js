import logo from './logo.svg';
import './App.scss';
import { Button } from 'antd'

function App() {
  return (
    <div className="App">
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <br />
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </div>
  );
}

export default App;
