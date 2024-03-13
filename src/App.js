import logo from './logo.svg';
import './App.css';
import DomainTable from './components/domain-table/DomainTable';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import DNSForm from './components/DNSform/DNSForm';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      {/* <Dashboard></Dashboard> */}
      <Routes>

        <Route path='/' element={<Dashboard> </Dashboard>} >
          <Route path='/' element={<DomainTable></DomainTable>} />
          <Route path='/form' element={<DNSForm></DNSForm>} />
        </Route>

      </Routes>


    </div>
  );
}

export default App;
