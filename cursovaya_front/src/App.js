import './App.css';

import Header from './components/Header';
import Content from './components/Content';

function App() {
  return (
    <div>
        <Header/>
        <div className="container">
          <Content />
        </div>
    </div>
  );
}

export default App;
