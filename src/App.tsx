import React from 'react';
import './App.css';
import { Layout } from './components/layout/Layout';
import { HomePage } from './components/main/HomePage';

function App() {
  return (
    <div>
      <Layout>
        <HomePage/>
      </Layout>
    </div>
  );
}

export default App;
