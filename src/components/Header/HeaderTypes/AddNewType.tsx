import React from 'react'

import { useDispatchTS } from '../../../usersHooks/useDispatchTS'
import { useSelectorTS } from '../../../usersHooks/useSelectorTS'
import MyButton from '../../myButton/MyButton'


import s from './typeBlock.module.scss'

export const AddNewType:React.FC = ():React.ReactElement => {

        const currentElement=React.useRef<any>(null)

        const [showBlock,setShowBlock]=React.useState<Boolean>(false)

        const [currentValue,setCurrentValue]=React.useState<string>('')

       const {currentProductID,products}= useSelectorTS(state=>state.main)

       const currentCategory=products.find(el=>el.id===currentProductID)
        
       const {createNewTypeForCurrentCategory}=useDispatchTS()

        const showAddBlock=()=>{
                setShowBlock(prev=>!prev)
        } 

         const nameForType:React.ChangeEventHandler<HTMLInputElement>=(e)=>{
                setCurrentValue(e.target.value)
         }
     

        const createNewType:React.MouseEventHandler<HTMLButtonElement>=(e)=>{
          e.preventDefault() 
          if(currentValue!==""){
                const result= {
                  typeName: currentValue,
                  typeId: +Date.now(),
                  info: [],
                   
                  
                }  

                createNewTypeForCurrentCategory(result);
                
          }  
          setShowBlock(false)
          setCurrentValue("")
        }
        const changeElementState=(e:any)=>{
                if(!e.path.includes(currentElement.current)){
                        setShowBlock(false)
                }
        }
         
        React.useEffect(()=>{ 
       document.body.addEventListener('click',changeElementState)

        return ()=>document.body.removeEventListener('click',changeElementState)
        
        },[])

        return (
                <div style={{position:'relative'}} ref={currentElement}> 
                        <div onClick={showAddBlock} className={s.button}>
                               {showBlock? <span>-</span>:<span>+</span>}
                                
                                
                                
                                
                                </div>

                        {showBlock&& 

                        <div className={s.main_content}>

                                <span> {currentCategory?.category }: Добавить подкотегорию </span>

                                <form>
<input type="text" onChange={nameForType} value={currentValue} placeholder='Подкатегория'/>     

                                    <MyButton onClick={createNewType}
                                    style={{
                                        'width': '259px',
                                        'height': '32px',
                                        'color':"#fff",
                                        'background': '#0008C1',
                                        'borderRadius': '25px',
                                        'fontWeight': 600,
                                         'fontSize': '16px',
                                         'lineHeight': '20px',
                                         'margin':'0 auto',
                                         'cursor':"pointer"
                                    }}

                                    >
                                            Добавить
                                             </MyButton>                     
 
                                </form>

                        </div>
                        }
                </div>
        )
}
