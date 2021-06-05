import './App.css';
import {useEffect} from 'react'

import HeaderContainer from './components/HeaderContainer';
import ContentContainer from './components/ContentContainer';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import {getTable} from './redux/tables-reducer';

function App(props) {
  let location = useLocation().pathname;
  if(location === '/') location = 'zakaz';
  const dispatch = useDispatch();
   useEffect(() => {
   dispatch(getTable(location))
   });

  return (
    <div>
        <HeaderContainer/>
        <div className="container">
          <ContentContainer />
        </div>
    </div>
  );
}

export default App;
