import React, { ReactElement } from 'react'
import { useHistory, useRouteMatch } from 'react-router'

import s from './addProduct.module.scss'

const AddProduct:React.FC = ( ): ReactElement=> {
         const history=useHistory()
         const params=useRouteMatch()    
        const addNewProduct=()=>{

                 history.push(params.url+"/"+"addNewProduct");     
        }
        

        return (
                <div className={s.add_product_block} onClick={addNewProduct}>
                        <div>
                         +
                         </div>
                </div>
        )
}

export default AddProduct
