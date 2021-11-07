import { actions,actionTypes,Iproducts,InewCatName,Itypes,Iinfo, filterByPricOrDate,chnageTypeName } from './../reduxTypes/Types';



export const initalACtion=():actions=>({
        type:actionTypes.INITAL_ACTION
})

export const changeCurrentCategory=(id:number| null):actions=>({
        type:actionTypes.CHANGE_ACTIV_CATEGORY,
        payload:id
})

export const changeGender=(val:string):actions=>(
        {
                type:actionTypes.CHANGE_GENDER,
                payload:val
        }
)

export const changeCurrentTypeID=(val:number):actions=>({
        type:actionTypes.CHANGE_CURRENT_TYPE,
        payload:val
        
})

export const createNewCategory=(val:Iproducts):actions=>({
        type:actionTypes.CREATE_NEW_CATEGORY,
        payload:val

})

export const changeCatName=(val:InewCatName):actions=>({
type:actionTypes.CHANGE_CATEGORY_NAME,
payload:val
})

export const removeCategoryById=(val:number):actions=>({
        type:actionTypes.REMOVE_CATEGORY,
        payload:val
})

export const removeType=(val:number):actions=>({
        type:actionTypes.REMOVE_TYPE,
        payload:val
})


export const createNewTypeForCurrentCategory=(val:Itypes):actions=>({
 type:actionTypes.CREATE_NEW_TYPE,
 payload:val   
})

export const createNewProduct=(val:Iinfo):actions=>({
         type:actionTypes.CREATE_NEW_PRODUCT,
         payload:val
})

export const filteredDate=(val:string):actions=>({
 type:actionTypes.FILTER_DATE,
 payload:val

})

export const filteredByDateOrPrice=(val:filterByPricOrDate):actions=>({
type:actionTypes.FILTER_BY,
payload:val
})

export const discardFilter=():actions=>({
type:actionTypes.DISCARD_FILTER
})

export const newTypeName=(val:chnageTypeName):actions=>({
type:actionTypes.NEW_TYPE_NAME,
payload:val
})

export const removeImg=(val:number):actions=>({
        type:actionTypes.REMOVE_IMG,
        payload:val
})