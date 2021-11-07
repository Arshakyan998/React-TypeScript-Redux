import { largeImgInitalState,largesImgTypes,largeTypes } from './../reduxTypes/Types';

const initalState:largeImgInitalState={
        date:[],
        isLarge:false
}

export const showHideLargeImg=(state=initalState,action:largesImgTypes):largeImgInitalState=>{
 switch (action.type) {
         case largeTypes.LARGE_IMG:{
                 return {
                         ...state,
                         isLarge:action.payload
                 }
         }
              case largeTypes.LARGE_IMG_DATE:{
  
                      return{
                              ...state,
                              date:action.payload
                      }
              }   
               
 
         default:
                 return state;
 }
}