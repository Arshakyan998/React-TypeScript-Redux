import React from "react";
import { Switch, Route ,Redirect } from "react-router";
import { CSSTransition } from "react-transition-group";



import { paths } from "./RuotePaths";
import './animation.scss'

export const Routes: React.FC = (): React.ReactElement => {
  return (
    <>
      <Switch >{
      paths.map(el=>{

  return <Route  path={el.path} exact={el.exact} key={el.path}>
  
  
  {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={500}
                  classNames="page"
                  unmountOnExit
                >
                  <div className="page">
                    <el.component />
                  </div>
                </CSSTransition>
              )
  }

  </Route>

      })
      }

             <Redirect to='/'/> 

      </Switch>
    </>
  );
};
