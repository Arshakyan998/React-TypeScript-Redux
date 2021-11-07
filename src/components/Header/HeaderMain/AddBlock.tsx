import React from 'react'
import { useHistory } from 'react-router'

import { useDispatchTS } from '../../../usersHooks/useDispatchTS'

import s from './add.module.scss'

import f from './headerMain.module.scss'


import loadImg from '../../../assets/Group42.svg'

interface Props {
        id:number,
        currentProductID:number | null,
        productCount:number,
        category:string,
        stateChangeBlock:boolean

}

interface InewCat{
  category:string,
  catSrc:string,
}

export const AddBlock:React.FC <Props> = ({id,currentProductID,productCount,category}):React.ReactElement => {

       const history=useHistory()

       const currentBlock=React.useRef<HTMLDivElement | null>(null)

         const {changeCatName,removeCategoryById}=useDispatchTS()

        const [newCatName,setNewCatName]=React.useState<InewCat>({
          category: "",
         
    
          catSrc:""
        })

       
         
        const [changeShowAndHideBlock,setChangeAndShowBlock]=React.useState<boolean>(false)

 

      const chnageCurrentBlockName =(e:React.ChangeEvent<HTMLInputElement>,name:string)=>{
        switch (name) {
          case 'text':
            setNewCatName(prev=>({...prev,category:e.target.value}))  
            break;
        
          case 'img':
            if(e.target.files && e.target.files[0]){
              console.log(e.target.files[0].name);
              
              
         setNewCatName(prev=>({...prev,catSrc:`../../../assets/${e.target.files&&e.target.files[0].name}`} ))  
            }
            break;
        }
                       
                
             }

             

        const removeCategory:React.MouseEventHandler<HTMLDivElement>=(e)=>{
           e.stopPropagation()
           if(window.confirm(`Вы действительно хотите удалить категорию ${category}`)){
                        removeCategoryById(id)

                 if(id===currentProductID){
    
                 history.push('/')
           }       
           }
     
        }  
        
        const changeCurrentState=(e:any):void=>{
          if(!e.path.includes(currentBlock.current)){
            setChangeAndShowBlock(false)
          }
          
          
          

                }
        React.useEffect(()=>{
           document.body.addEventListener('click', changeCurrentState)
           return ()=>document.body.removeEventListener('click', changeCurrentState)

        },[])
        
        
 
 const createNewName=(id:number)=>{
                const result:any={
                  category:newCatName.category,
                  catSrc:newCatName.catSrc,
                id
               }  

               let isComplite=false
               
               for(let key in result){
                 if(result[key]===""){
                     alert('Заполните все поля')

                     break
                 }
                 else if(result[key]){
                  isComplite=true
                  break
                 }

                 
               }

                
               if(isComplite){
                changeCatName(result)
                setChangeAndShowBlock(false)

                 setNewCatName({
                  category:"",
                   catSrc:""
                 })
               }  
               
              }
              
              const showChangeBlock=()=>{
                setChangeAndShowBlock(!changeShowAndHideBlock)
                      }
              

        return (
    
                <div ref={currentBlock}> 
                <div className={f.showAddAndHideBlock} >  
                <div onClick={showChangeBlock}>	&#9998;</div>
                {
                 productCount>1 &&  <div onClick={removeCategory}>&#10006;</div>
                }
               
                 </div>
               
               {
                 

               changeShowAndHideBlock &&    
               <div className={s.main_add_block} > 
               <div className={s.main_add_block_add}>
                    
    
              <input type="text" 
              onChange={(e)=>chnageCurrentBlockName(e,'text')}
              data-type={id}
              value={newCatName.category}
              placeholder={category}

            />
            <div className={s.main_add_block_add_img}>
              <input type="file" id={`imgFor${id}`}  onChange={(e)=>chnageCurrentBlockName(e,'img')}/>
              <label htmlFor={`imgFor${id}`} >
               <img src={newCatName.catSrc?newCatName.catSrc:loadImg} alt="" width="50%" />
                  </label> 

              </div>
              <div>
              <button onClick={()=>createNewName(id)}>Submit </button>

              </div>
              
               </div>
               
               
               
                              

               </div> 
               
               
               }
               </div>   
                  
                 

        )
}
