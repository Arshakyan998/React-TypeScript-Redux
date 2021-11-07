import React from 'react'
import { useLocation } from 'react-router'

import { useSelectorTS } from '../../usersHooks/useSelectorTS'


const SaveProgress = () => {
       
       const params=useLocation() 
       
      

       
       const {products,currentProductID } = useSelectorTS(state=>state.main)

       const currentType=products.find(el=>el.id ===currentProductID)

       
       
        React.useEffect(()=>{
                const clone=JSON.parse(JSON.stringify(products))

 localStorage.setItem('products',JSON.stringify(clone))

 
 
         },[products.length,currentType?.types.length]) 

        React.useEffect(()=>{ 
                localStorage.setItem('path',params.pathname)

        },[params.pathname])

        return (
                <>
                        
                </>
        )
}

export default SaveProgress
