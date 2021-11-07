import React, { ReactElement } from "react";

import { useParams } from "react-router";

import { iImages } from "../../redux/reduxTypes/Types";
import { useDispatchTS } from "../../usersHooks/useDispatchTS";
import { useSelectorTS } from "../../usersHooks/useSelectorTS";

import AddProduct from "./AddProduct/AddProduct";
import { Filter } from "./filterdProducts/Filter";
import s from "./Main.module.scss";

interface Iparams {
  id: string;
}

function Main(): ReactElement {
  const params: Iparams = useParams();

  const { products, currentgender,currentTypeID } = useSelectorTS((state) => state.main);
 const {showLargeImg:largeImg,largeImgDate,removeImg }=useDispatchTS()
  const productsType = products
    .find((el) => el.id === +params.id)
    ?.types.find(el=>el.typeId===currentTypeID)?.info.filter(el=>el.gender===currentgender)
     
     
    
    
    if( !productsType?.length){
            return(
                <div className={s.main}>
                        <AddProduct/>
{
  currentTypeID && currentgender &&<Filter/>
}
        <h1>Этого изделие нет для {currentgender==='male'?'Мужчин':'Женщин'}</h1>

                        </div>
            )
    } 

    const showLargeImg=(src:iImages[])=>{ 
     
      largeImg(true)
      largeImgDate(src)
    }

    const removeCurrentContent=(e: React.MouseEvent<HTMLDivElement, MouseEvent>,id:number,name:string)=>{
      e.stopPropagation()
      if(window.confirm(`Вы действительно хотите удалить ${name} `)){
              removeImg(id);
      }
      
    }

  return (
    <div className={s.main}>
      <AddProduct/>
      {
  currentTypeID && currentgender &&<Filter/>
}
      {productsType?.map((el) => { 
         
        return (
          <div key={el.imgId} className={s.main_content} onClick={()=>showLargeImg(el.src)}>
            <div >
              <img
                src={el.src[0].src}
                alt={el.description}
                width="100%"
                height="100%"
              />
            </div>
            <div className={s.main_content_description}>
              <div>{el.description}</div>
              <div>{el.date?.months}.{el.date?.days}.{el.date?.year} </div>
              <div>{el.price}$</div> 
            
          </div> 
           <div style={{position:'absolute',top:"10px",right:"10px",cursor:"pointer"}} 
            onClick={(e)=>removeCurrentContent(e,el.imgId!,el.description)}>&#10008; </div>
            </div>
           
        );
      })}
    </div>
  );
}

export default Main;
