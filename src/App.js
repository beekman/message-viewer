import './App.css';
import { messages } from './data.json';
import Messages from './components/Messages/Messages';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Message Viewer</h1>
        <h2>{messages[1].sentAt}</h2>
        <Messages messages={messages} />
      </header>
    </div>
  );
}

export default App;
