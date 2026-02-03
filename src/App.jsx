import { RrwebPlayer } from 'rehearseur'
import 'rehearseur/style.css'

function App() {
  return (
    <div className="App" style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <RrwebPlayer
          recordingUrl="recording_demo_machine_learning_mmf.json"
          annotationsUrl="recording_demo_machine_learning_mmf.md" />
    </div>
  )
}

export default App