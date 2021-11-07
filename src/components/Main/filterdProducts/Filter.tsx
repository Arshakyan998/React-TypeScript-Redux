import React from "react";
import { Input, DatePicker } from "antd";

import { getDate } from "../../../utils/GetDate";

import s from "./filter.module.scss";
import "antd/dist/antd.css";
import MyButton from "../../myButton/MyButton";
import { useDispatchTS } from "../../../usersHooks/useDispatchTS";
import {Idate} from '../../../redux/reduxTypes/Types'

export  interface IDate {
  start: Idate| null;
  finish: Idate | null;
}
export interface IPrice {
  start: number | string |null;
  finish: number | string|null;
}
export const Filter: React.FC = (): React.ReactElement => {
  const [date, setDate] = React.useState<IDate>({
    start:null ,
    finish:null ,
  });

  const [price, setPrice] = React.useState<IPrice>({
    start: "" ,
    finish: "" ,
  }); 
  
  const [showFilter,setShowFilter]=React.useState<Boolean>(false)

  const filterWord=['ф', 'и', 'л', 'ь' ,'т' ,'р']
  
  const obsorver=React.useRef(null)

  const {filteredByDateOrPrice,discardFilter}=useDispatchTS()

  const showDate = (e: any): void => {
     
    const start =e && getDate(e[0]._d);
    const finish =e&& getDate(e[1]._d);
   setDate((prev) => ({ ...prev, start, finish }));
  };
  
  

  const filterPrice = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
   
    const value = e.target.value.replace(/[^0-9\.]/g, "");

    switch (name) {
      case "from":
        setPrice((prev) => ({ ...prev, start: +value }));
        break;

      case "to":
        setPrice((prev) => ({ ...prev, finish: +value }));

        break;
    }
  };

  const fiteredDate=()=>{
          const result={
                  date,
                  price
          }

          filteredByDateOrPrice(result);
          setShowFilter(false)

  }
  const filterDiscard=()=>{
    discardFilter()
    setDate(prev=>({...prev,start:null,finish:null}))
    setPrice(prev=>({...prev,finish:"",start:""}))
    setShowFilter(false)

  }
  
  const showHideFilterBlock=()=>{
    setShowFilter(prev=>!prev)
  } 
 
  const hideFilterBlock=(e:any)=>{
  if(!e.path.includes(obsorver.current)){
    setShowFilter(false)
     
  }
 
  }

   React.useEffect(()=>{
     document.body.addEventListener('click',hideFilterBlock)
     return ()=>{
       
      document.body.removeEventListener('click',hideFilterBlock)
     }
   })

  return (
 
    <div className={showFilter? `${s.main} ${s.show}`  :s.main} ref={obsorver}>   
    <div className="site-input-group-wrapper">
      <h3>Фильтрация по цене</h3>
      <div className={s.main_filter_content_price}>
        <div>
          <input
            type="text"
            placeholder={"от"}
            onChange={(e) => filterPrice(e, "from")}
            value={price.start!}
          />$
        </div>
        <div style={{fontSize:'25px'}}>
        &rarr;
        </div>
        <div>
          <input
            type="text"
            placeholder={"до"}
            onChange={(e) => filterPrice(e, "to")}
            value={price.finish!}
          />$
        </div>
      </div>
      <br /> 
       <h3>Фильтрация по дате</h3>
       <div  onClick={(e)=>e.stopPropagation()}>

      <Input.Group compact >
        <DatePicker.RangePicker  onChange={showDate}/>
 
      </Input.Group>
      </div>
      <br />   

      <MyButton onClick={fiteredDate}>
               OK
      </MyButton>
      <MyButton onClick={filterDiscard}>
               сбросить фильтр
      </MyButton>
    </div>
    <div className={s.main_show_hide_filter} onClick={showHideFilterBlock}>
        {
          filterWord.map(el=>{
            return <h2 key={el}>{el}</h2>
          }) 
          
        }
        
        <h2>{showFilter?<span>&#9668;</span>:<span> &#9658; </span>}</h2>
    </div>

    </div>
  );
};
