import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import DataTable from './Datatable';
import { Box } from '@mui/material';

function App() {

  return (
    <div className="App">
      <Box sx={{textAlign:"center",mt:4}}>
      <img src='https://cdn.cutshort.io/public/companies/6034f6e429295f0b698a1667/optimised/coverPictureURL_1634811569594' height="60px" />
      </Box>
     
       <DataTable/>
    </div>
  );
}

export default App;
