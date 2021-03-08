import './App.css';
import UserTable from './components/UserTable';
import CreateUser from './components/CreateUser';
import TFF from './components/TableFromFile';
import ReadUser from "./components/ReadPatient";

function App() {
  return (
    <div className="App">
      <h2 style={{paddingLeft: "20px"}}>FHIR-CRUD-APP</h2>
      <CreateUser />
      <ReadUser />
      <TFF />
      <UserTable />
    </div>
  );
}

export default App;
