import { actionsType } from './../root';
import { getDate } from "./../../utils/GetDate";

import { IState, actions, actionTypes, Itypes, Iproducts } from "./../reduxTypes/Types";

let initalState: IState = {
  products: [
    {
      category: "Кольцо",
      id: 1,

      catSrc:
        "https://th.bing.com/th/id/R.3c5fc1abdbbb379356a50f447bef52eb?rik=zp1VE%2bKVveBNlw&pid=ImgRaw&r=0",
      types: [
        {
          typeName: "Кольцо",
          typeId: 1,
          info: [
            {
              src: [
                {
                  id: 1,
                  src: "https://th.bing.com/th/id/R.3c5fc1abdbbb379356a50f447bef52eb?rik=zp1VE%2bKVveBNlw&pid=ImgRaw&r=0",
                }, {
                  id: 2,
                  src: "https://miuz.ru/upload/resize_cache/iblock/e89/580_580_0/N2018_351706D1FQQUSN.jpg",
                },
              ],
              imgId: 1,
              description: "A",
              price: 400,
              gender: "male",
              date: getDate(new Date()),
            },
            {
              src: [
                {
                  src: "https://th.bing.com/th/id/R.3c5fc1abdbbb379356a50f447bef52eb?rik=zp1VE%2bKVveBNlw&pid=ImgRaw&r=0",
                  id: 2,
                },
              ],
              imgId: 2,
              description: "b",
              price: 700,
              gender: "fmale",
              date: getDate(new Date()),
            },
          ],
        },
        {
          typeName: "Колье",
          typeId: 2,
          info: [
            {
              src: [
                {
                  src: "https://th.bing.com/th/id/R.3c5fc1abdbbb379356a50f447bef52eb?rik=zp1VE%2bKVveBNlw&pid=ImgRaw&r=0",
                  id: 1,
                },
              ],
              imgId: 1,
              description: "AисВ",
              price: 1400,
              gender: "male",
              date: getDate(new Date()),
            },
          ],
        },
      ],
    },
    {
      category: "Колье",
      id: 2,

      catSrc:
        "https://miuz.ru/upload/resize_cache/iblock/e89/580_580_0/N2018_351706D1FQQUSN.jpg",
      types: [
        {
          typeName: "Колье",
          typeId: 1,
          info: [
            {
              src: [
                {
                  src: "https://miuz.ru/upload/resize_cache/iblock/e89/580_580_0/N2018_351706D1FQQUSN.jpg",
                  id: 1,
                },
              ],
              imgId: 1,
              description: "bca",
              price: 400,
              gender: "male",
              date: getDate(new Date()),
            },
          ],
        },
      ],
    },
  ],

  currentProductID: null as number | null,
  currentTypeID: 1,
  currentgender: "male",
  productClone: [],
};

if(localStorage.getItem('products')){
  initalState.products=JSON.parse(localStorage.getItem('products')!)
    
}

export const main = (state = initalState, action: actions): IState => {
  switch (action.type) {
    case actionTypes.INITAL_ACTION: {
      return {
        ...state,
        productClone: state.products,
      };
    }

    case actionTypes.CHANGE_ACTIV_CATEGORY: {
      return {
        ...state,
        currentProductID: action.payload,
        currentTypeID: 1,
      };
    }
    case actionTypes.CHANGE_GENDER: {
      return {
        ...state,
        currentgender: action.payload,
      };
    }

    case actionTypes.CHANGE_CURRENT_TYPE: {
      return {
        ...state,
        currentTypeID: action.payload,
      };
    }
    case actionTypes.CREATE_NEW_CATEGORY: {
      const newItem = [...state.products, action.payload];

      return {
        ...state,
        products: newItem,
        productClone: newItem,
      };
    }
    case actionTypes.CHANGE_CATEGORY_NAME: {
      const { id } = action.payload;

      const newItem = [...state.products].map((el) => {
        if (el.id === id) {
          return (el = {
            ...el,
            ...action.payload,
          });
        }
        return el;
      });

      return {
        ...state,
        products: newItem,
        productClone: newItem,
      };
    }
    case actionTypes.REMOVE_CATEGORY: {
      const newItem = [...state.products].filter(
        (el) => el.id !== action.payload
      );

      return {
        ...state,
        products: newItem,
        productClone: newItem,
      };
    }

    case actionTypes.REMOVE_TYPE: {
      const newItem = [...state.products].map((el) => {
        if (el.id === state.currentProductID) {
          for (let i = 0; i < el.types.length; i++) {
            if (el.types[i].typeId === action.payload) {
              el.types.splice(i, 1);
            }
          }
        }

        return el;
      });

      if (state.currentTypeID === action.payload) {
        return {
          ...state,
          products: newItem,
          currentTypeID: null,
          productClone: newItem,
        };
      }

      return {
        ...state,
        products: newItem,
        productClone: newItem,
      };
    }

    case actionTypes.CREATE_NEW_TYPE: {
      const newItem = [...state.products].map((el) => {
        if (el.id === state.currentProductID) {
          el.types.push(action.payload);
        }
        return el;
      });

      return {
        ...state,
        products: newItem,
        productClone: newItem,
      };
    }
    case actionTypes.CREATE_NEW_PRODUCT: {
      const newItem = [...state.products].map((el) => {
        if (el.id === state.currentProductID) {
          el.types.forEach((el) => {
            if (el.typeId === state.currentTypeID) {
              el.info.push(action.payload);
            }
          });
        }
        return el;
      });
      return {
        ...state,
        products: newItem,
        productClone: newItem,
      };
    }

    case actionTypes.FILTER_DATE: {
      const clone = JSON.parse(JSON.stringify(state.productClone));

      const newItem = [...clone].find((el) => {
        if (el.id === state.currentProductID) {
          return el;
        }
      })!;

      const { types } = newItem;

      const result = [...types].find((el) => {
        if (el.typeId === state.currentTypeID) {
          return el;
        }
      });
      const { info } = result;
      const filterdArr = info.filter((el: any) =>
        el.description
          .toLocaleLowerCase()
          .includes(action.payload.toLocaleLowerCase())
      );

      const newResult = [...clone].map((el) => {
        if (el.id === state.currentProductID) {
          el.types.forEach((el: any) => {
            if (el.typeId === state.currentTypeID) {
              el.info = filterdArr;
            }
          });
        }
        return el;
      });

      return {
        ...state,
        products: newResult,
      };
    }
    case actionTypes.FILTER_BY: {
      const { date, price } = action.payload;

      const { start, finish } = date;

      if (start && finish) {
        var { days, months, year } = start;
        var { days: fdays, months: fmonths, year: fyear } = finish!;
      }

      const dateClone = JSON.parse(JSON.stringify(state.productClone));

      const newItem = dateClone.find(
        (el: any) => el.id === state.currentProductID
      );

      const findCurrentType = newItem?.types.find(
        (el: any) => el.typeId === state.currentTypeID
      );

      const result = findCurrentType?.info.filter((el: any) => {
        if (
          price.start &&
          price.finish &&
          days &&
          year &&
          months &&
          fdays &&
          fyear &&
          fmonths
        ) {
          if (
            el.price > price.start &&
            el.price < price.finish &&
            (el.date?.days! > days ||
              el.date?.year! > year ||
              el.date?.months! > months) &&
            (el.date?.days! < fdays ||
              el.date?.year! < fyear ||
              el.date?.months! < fmonths)
          ) {
            console.log(el.price > price.start && el.price < price.finish);

            return el;
          }
        } else if (days && year && months && fdays && fyear && fmonths) {
          if (
            (el.date?.days! > days ||
              el.date?.year! > year ||
              el.date?.months! > months) &&
            (el.date?.days! < fdays ||
              el.date?.year! < fyear ||
              el.date?.months! < fmonths)
          ) {
            return el;
          }
        } else if (price.start && price.finish) {
          if (el.price > price.start && el.price < price.finish) {
            return el;
          }
        }
      });

      const newState = dateClone.filter((el: any) => {
        if (el.id === state.currentProductID) {
          el.types.forEach((el: any) => {
            if (el.typeId === state.currentTypeID) {
              el.info = result;
            }
          });
        }
        return el;
      });

      return {
        ...state,
        products: newState,
      };
    }
  case actionTypes.DISCARD_FILTER:{
 
    const clone:any=state.productClone
    
    return{
      ...state,
      products:clone 
    }
  } 

  case actionTypes.NEW_TYPE_NAME:{

    const {id,newTypeName}=action.payload

    const newItem=[...state.products].map(el=>{
      if(el.id===state.currentProductID){
            el.types.forEach(el=>{
              if(el.typeId===id){
                el.typeName=newTypeName
              }
            })
         }
        return el
        })
      
     
  
    return{
      ...state,
      products:newItem
    }
  }

  case actionTypes.REMOVE_IMG:{
   
 
    const newItem=[...state.products].find(el=>el.id===state.currentProductID)!

    const {types}=newItem
     
    const arr=types.find(el=>el.typeId===state.currentTypeID)!
    
    const newArr=arr.info.filter(el=>el.imgId!==+action.payload)


    const result=[...state.products].map(el=>{
      if(el.id===state.currentProductID){
        el.types.forEach(el=>{
          if(el.typeId===state.currentTypeID){
            el.info=newArr
          }
        })
      }
      return  el
    })
    
    

    return{
      ...state,
      products:result
    }
  }
    default:
      return state;
  }
};
