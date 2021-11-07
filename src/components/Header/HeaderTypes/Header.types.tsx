import React from "react";

import { useDispatchTS } from "../../../usersHooks/useDispatchTS";
import { useSelectorTS } from "../../../usersHooks/useSelectorTS";

import { AddNewType } from "./AddNewType";
import { Types } from "./Types";

export const HeaderTypes: React.FC = (): React.ReactElement => {
  const { products, currentProductID, currentTypeID } = useSelectorTS(
    (state) => state.main
  );


  const activeType =
    currentProductID &&
    products.find((el) => el.id === currentProductID)?.types;

  const { changeCurrentTypeID ,removeType} = useDispatchTS();

  const chnageCurrentTypeId = (id: number) => {
    changeCurrentTypeID(id);
  };

  const removeCurrentType=(e:React.MouseEvent<HTMLDivElement, MouseEvent> ,name:string,id:number)=>{
          e.stopPropagation()
          if(window.confirm(`вы действительно хотите удалить ${name}`)){
                removeType(id)
          }

  }

 

  return (
    <div> 
      {activeType && (
        <div style={{ display: "flex",alignItems:'center' }}>
          <h2 style={{ display: "flex",flexWrap:'wrap',maxWidth:'90%',alignItems:'center' }}>
          {activeType.map((el) => ( 
          <Types
            key={el.typeId}
            typeId={el.typeId}
            typeName={el.typeName}
            activeType={activeType}
            currentTypeID={currentTypeID}
            chnageCurrentTypeId={chnageCurrentTypeId}
            removeCurrentType={removeCurrentType}
            
            />))} 
           
          
            <AddNewType/>
          </h2>
            
        </div>
      )}
    </div>
  );
};
