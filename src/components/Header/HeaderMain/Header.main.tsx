import React, { ReactElement } from "react";
import { useHistory } from "react-router";

import { useDispatchTS } from "../../../usersHooks/useDispatchTS";
import { useSelectorTS } from "../../../usersHooks/useSelectorTS";

import s from "./headerMain.module.scss";

import male from '../../../assets/Vector.svg';
import fmale from '../../../assets/fmale.svg'


import { AddNewCategory } from "./AddNewCategory";
import { AddBlock } from "./AddBlock";
import { Search } from "../Search/Search";


function HeaderMain(): ReactElement {
   
   const [showAddBlock,setShowActiveBlock]=React.useState<boolean>(false)     
   const [activeGender,setActiveGender]=React.useState<string>('male')

   
   
   const gender=[{
           name:'male',
           src:male,
   
   },{
        name:'fmale',
        src:fmale,
   }
]  
  const history=useHistory()
        
  const { products,currentProductID,currentTypeID } = useSelectorTS((state) => state.main);

  const { changeCurrentCategory,changeGender } = useDispatchTS();


React.useEffect(()=>{
        changeGender(activeGender)
},[activeGender])

  const changeActiveCat = (id: number): void => {
    changeCurrentCategory(id);
    history.push(`/main/${id}`)

  };

  const chnageAtiveGender=(name:string):void=>{
        setActiveGender(name)
  }

  const chnageShowBlock=(isShow:boolean)=>{
        setShowActiveBlock(isShow)
        
  }


 
  return (
    <> 
    {currentProductID && currentTypeID
      && <Search currentProductId={currentProductID} currentTypeId={currentTypeID}/>}
      <nav className={s.header_nav} >
              <div className={s.header_nav_gender}>

              {
                      gender.map(el=>{
                          return <div 
                          key={el.name}
                           className={s.header_nav_gender_content}
                           onClick={()=>chnageAtiveGender(el.name) }
                           style={{background:activeGender===el.name?'blue':"" }}
                            
                           
                           
                           >
                                  <div>
                                  
          <img src={el.src} alt="a"   style={{color:'gray',background:'none'}}/> 
                                  </div>
                                  
                                  </div>    
                      })
              }
</div>
        {products.map((el) => {
          return (
            <div 
            style={{border: currentProductID===el.id ?'3px solid gray':"" }}
              onClick={() => changeActiveCat(el.id)}
              className={s.header_nav_content}
              key={el.id}
          
              
            >
            

              
                    <div className={s.header_nav_content_center}>
                    
              <img src={el.catSrc}
               alt={el.category}
                width="40px"
                 height="40px"
                 />

              <span className={s.header_nav_content_catname}> 

              {el.category}
              
              <AddBlock
               productCount={products.length}  
               currentProductID={currentProductID} 
               stateChangeBlock={true}
               {...el}
               />
             
             
              </span>
             
              </div> 
            
            </div>
          );
        })}
         
      

        <AddNewCategory showAddBlock={showAddBlock} chnageShowBlock={chnageShowBlock} />
      </nav>
    </>
  );
}

export default HeaderMain;
