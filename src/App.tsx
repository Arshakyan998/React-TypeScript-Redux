import React from "react";
import { Header } from "./components/Header/Header";

import { useDispatchTS } from "./usersHooks/useDispatchTS";
import { Routes } from "./Routes/Route";
import {
  useHistory,
  useLocation,
 
} from "react-router";
import { LargeImg } from "./components/Main/LargeImg/LargeImg";
import SaveProgress from "./components/saveProgres/SaveProgress";

function App(): React.ReactElement {
  const { initalACtion, changeCurrentCategory } = useDispatchTS();

  const location = useLocation();

  const path = location.pathname.split("/");


  

  const history = useHistory();
  React.useEffect(() => {
    initalACtion();
    history.push("/");

    if (localStorage.getItem("path")) {
      const currentPath=+path[path.length - 1]
      if(+path[path.length - 1]){
        history.push(localStorage.getItem("path")!);
      changeCurrentCategory(+currentPath);
      }
      
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes />
      <LargeImg />
      <SaveProgress />  
    </div>
  );
}

export default App;
