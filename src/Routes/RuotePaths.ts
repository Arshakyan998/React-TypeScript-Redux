import AddNewProduct from "../components/Main/addNewProduct/AddNewProduct";
import Main from "../components/Main/Main";


export enum rutes{
 main='/main/:id',
 standartPath='/',
 addNewProduct='/main/:id/addNewProduct'

}

export const paths=[
        {path:rutes.main, exact:true, component: Main },
        {path:rutes.addNewProduct, exact:true, component: AddNewProduct }

]
