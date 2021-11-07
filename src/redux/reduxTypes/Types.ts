import { IDate,IPrice } from "../../components/Main/filterdProducts/Filter";

export  interface iImages{
        src:string,
        id:number | null

}

export interface Idate{
        days: number| null
months: number| null
year: number| null
}

export interface Iinfo{
        src: iImages[],
                  imgId: number| null,
                  description: string,
                  price: number | null  ,
                  gender: string|null,
                  date?:Idate 
}

export interface Itypes{
        typeName: string,
           typeId: number,
           info:Iinfo[]
}


export interface Iproducts{
     category: string,
            id: number,
            
            types: Itypes[],
            catSrc:string,


}
     
 export interface InewCatName{
        catSrc:string,
        category:string
        id:number
 }     
       
      export interface filterByPricOrDate{
        
                date:IDate,
                price:IPrice
 
         
      }
     export interface IState{
        products:Iproducts[]
        currentProductID: null | number
        currentTypeID: null | number,
        currentgender:string,
        productClone?:Iproducts[]
      }

export interface chnageTypeName{
     
                id: number;
                name: string;
                newTypeName:string
      
}
     export  enum actionTypes{
        INITAL_ACTION='INITAL_ACTION',
        CHANGE_ACTIV_CATEGORY='CHANGE_ACTIV_CATEGORY',
        CHANGE_GENDER='CHANGE_GENDER',
        CHANGE_CURRENT_TYPE='CHANGE_CURRENT_TYPE',
        CREATE_NEW_CATEGORY='CREATE_NEW_CATEGORY',
        CHANGE_CATEGORY_NAME=' CHANGE_CATEGORY_NAME',
        REMOVE_CATEGORY='REMOVE_CATEGORY',
        REMOVE_TYPE='REMOVE_TYPE',
        CREATE_NEW_TYPE="CREATE_NEW_TYPE",
        CREATE_NEW_PRODUCT='CREATE_NEW_PRODUCT',
        FILTER_DATE="FILTER_DATE",
        FILTER_BY='FILTER_BY',
        DISCARD_FILTER='DISCARD_FILTER',
        NEW_TYPE_NAME='NEW_TYPE_NAME',
        REMOVE_IMG="REMOVE_IMG"
      }

      interface initalACtion{
              type:actionTypes.INITAL_ACTION
      }


      interface changeCurrentCategory{
              type:actionTypes.CHANGE_ACTIV_CATEGORY,
              payload:number | null

      }
      interface changeGender{
        type:actionTypes.CHANGE_GENDER,
        payload:string

}
interface changeCurrentTypeID{
        type:actionTypes.CHANGE_CURRENT_TYPE,
        payload:number

}
interface createNewCategory{
        type:actionTypes.CREATE_NEW_CATEGORY,
        payload:Iproducts
}

interface newCatName{
        type:actionTypes.CHANGE_CATEGORY_NAME,
        payload:InewCatName
}

 


interface removeCategory{
 type:actionTypes.REMOVE_CATEGORY,
 payload:number
}

interface removeType{
        type:actionTypes.REMOVE_TYPE,
        payload:number
}

interface createNewTypeForCat{
type:actionTypes.CREATE_NEW_TYPE,
payload:Itypes

}  

interface createNewProduct{
        type:actionTypes.CREATE_NEW_PRODUCT,
        payload:Iinfo
}

interface filteredDate{
        type:actionTypes.FILTER_DATE,
        payload:string
} 

interface filterBy{
        type:actionTypes.FILTER_BY,
         payload:filterByPricOrDate
}

interface discardFilter{
        type:actionTypes.DISCARD_FILTER
}
 

interface newTypeName{
        type:actionTypes.NEW_TYPE_NAME,
        payload:chnageTypeName
} 

interface removeImg{
        type:actionTypes.REMOVE_IMG,
        payload:number
}


      export type actions=
       initalACtion
      |changeCurrentCategory 
      |changeGender 
      |changeCurrentTypeID 
      |createNewCategory
      |newCatName
      |removeCategory
      |removeType
      |createNewTypeForCat
      |createNewProduct
      |filteredDate
      |filterBy
      |discardFilter
      |newTypeName
      |removeImg


      //// large img 

      export interface largeImgInitalState{
              isLarge:boolean,
              date:iImages[]
      } 
    
      export enum largeTypes{
              LARGE_IMG='LARGE_IMG',
              LARGE_IMG_DATE="LARGE_IMG_DATE"
      }

      interface LargeImg{
               type:largeTypes.LARGE_IMG,
               payload:boolean
      }
       
      interface LargeImgDate{
              type:largeTypes.LARGE_IMG_DATE,
              payload:iImages[] 
      }
      

 export type largesImgTypes = LargeImg | LargeImgDate
