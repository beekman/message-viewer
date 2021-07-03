import './App.css';
import { messages } from './data';
import Messages from './components/Messages/Messages';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Message Viewer</h1>
      </header>
      <Messages messages={messages} />
    </div>
  );
}

export default App;
