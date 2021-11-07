import React from 'react'
import { Itypes } from '../../../redux/reduxTypes/Types'
import { useDispatchTS } from '../../../usersHooks/useDispatchTS'
import MyButton from '../../myButton/MyButton'

interface Props {
        activeType:Itypes[],
        currentTypeID:number | null,
        chnageCurrentTypeId:(id:number)=>void,
        removeCurrentType:(e:React.MouseEvent<HTMLDivElement, MouseEvent>, name:string,id:number)=>void,
        typeId:number,
        typeName:string
}



export const Types:React.FC<Props> = ({
        activeType,
        currentTypeID,
        chnageCurrentTypeId,
        removeCurrentType,
        typeId,
        typeName
}):React.ReactElement => {
 
        const showBlock=React.useRef<HTMLDivElement | null>(null)

        const [hideEditBlock,setEditBlock]=React.useState<boolean>(false)

        const [newTypeName,setNewTypeName]=React.useState<string>('')
        

        const {newTypeName:changeTypeName}=useDispatchTS()

        const changeEditState:React.MouseEventHandler<HTMLDivElement>=(e)=>{
                e.stopPropagation()
                setEditBlock(prev=>!prev) 

              }
               
   
              const closeEditBlock=(e:any)=>{
                      if(!e.path.includes(showBlock.current)){
                        setEditBlock(false)
                      }
              }

              const setNewName:React.ChangeEventHandler<HTMLInputElement>=(e)=>{
                setNewTypeName(e.target.value)
  
              } 
              
 
              const createNewName=( id:number,name:string )=>{
                const result= {
                          id,
                          name,
                         newTypeName
                        } 
                      
                        if(newTypeName!==""){
                                changeTypeName(result)
                        }
                        setEditBlock(false)

              }

              React.useEffect(()=>{
                document.body.addEventListener('click',closeEditBlock)
                return ()=> document.body.removeEventListener('click',closeEditBlock)


              },[])

        return (
                <>
                    
              <div
            
                onClick={() => chnageCurrentTypeId(typeId)}
                style={{ padding: "10px",
                 cursor: "pointer",
                 borderBottom:currentTypeID===typeId?'3px solid red':'none'  }}
              >
                {typeName}
                <div style={{display:'flex',justifyContent:'space-between',position:"relative"}}>
                {
                  activeType.length >1 &&
                  <div onClick={(e)=>removeCurrentType(e,typeName,typeId)}>&#10006;</div>
                }
                <div ref={showBlock}>
                 <div onClick={changeEditState}>✎</div>
                 
                 {
                   hideEditBlock && 
                   <div style={{
                           position:'absolute',
                           top:'55px',
                           left:"5px",
                           background:'#ffff',
                           padding:'7px',
                           borderRadius:'10px',
                           border:'3px solid gray',
                           display:'flex',
                           justifyContent:'space-between'
                           }}> 
         <input type="text"
          style={{width:'95px',outline:'none',border:'none'}} 
          placeholder={typeName}
          onChange={setNewName}
          value={newTypeName}
          maxLength={10}
          />
         <MyButton onClick={()=>createNewName(typeId,typeName)}>Ok</MyButton>
                 </div>
                 }
                 </div>
                     </div>        
              </div>
                 
                </>
        )
}
