import React from 'react';
import CatGrid from './components/CatGrid';
import BillingButton from './components/BillingButton';
import members from './members.json'; // Assuming you have a members.json file with the members' data

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Cat Gallery</h1>
      <CatGrid />
      <BillingButton members={members} />
    </div>
  );
};

export default App;
