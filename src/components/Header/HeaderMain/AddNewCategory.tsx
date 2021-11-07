import React from "react";

import donloadImg from "../../../assets/Group42.svg";
import { useDispatchTS } from "../../../usersHooks/useDispatchTS";
import MyButton from "../../myButton/MyButton";
import s from "./headerMain.module.scss";

interface Props {
  showAddBlock: boolean;
  chnageShowBlock: (isShow: boolean) => void;
}

// interface Iref {
//   current: HTMLDivElement | ElementRef<ElementType>;
// }

export const AddNewCategory: React.FC<Props> = ({
  showAddBlock,
  chnageShowBlock,
}): React.ReactElement => {
  const blockRef = React.useRef<HTMLDivElement | null >(null);

  const [imgInp, setImgInp] = React.useState<string>("");
  const [newCatName, setNewCatName] = React.useState<string>("");

  const {createNewCategory}=useDispatchTS()

  const changeStateShowBlock: React.MouseEventHandler<HTMLDivElement> = (e) => {
    chnageShowBlock(!showAddBlock);
    e.stopPropagation();
  };

  const closeBlock = (e: any) => {
    if (!e.path.includes(blockRef.current)) {
      chnageShowBlock(false);
    }
  };

  React.useEffect(() => {
    document.body.addEventListener("click", closeBlock);

     return ()=> document.body.removeEventListener("click", closeBlock)
     
  }, []);

  const AddNewCategory = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    switch (name) {
      case "category":
        setNewCatName(e.target.value);

        break;

      case "image":
        if (e.target.files) {
          setImgInp(e.target.files[0].name);
        }

        break;
    }
  };

  const createNewCat=()=>{
   if(newCatName===""){
     alert('null1')
   }else if(imgInp===""){
     alert('null2')
   }else{
     const result=  {
      category: newCatName,
      id: +Date.now(),
     
      catSrc: `../../../assets/${imgInp}`,
      types: [
       { typeName:newCatName,
        typeId: 1,
        info: []
      }
         
        
      ]
  }
  createNewCategory(result)
  chnageShowBlock(false);
  setNewCatName('')
  setImgInp('')
   }

  }

  return (
    <div className={s.header_nav_add} onClick={(e) => e.stopPropagation()}>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "28px",
        }}
        onClick={changeStateShowBlock}
      >
        {showAddBlock ? "-" : "+"}
      </div>

      <div
        ref={blockRef}
        className={showAddBlock ? s.header_nav_add_cart : s.header_nav_add_hide}
      >
        <div
          className={s.header_nav_add_cart_content}
          style={{ cursor: "auto" }}
        >
          <span>добавить категория</span>
          <div>
            <input
              type="text"
              placeholder={"Категория"}
              onChange={(e) => AddNewCategory(e, "category")}
                value={newCatName}
            />
          </div>
          <div className={s.header_nav_add_cart_content_img_block}>
            <label htmlFor="addImg">
         <img src={ imgInp ?`../../../assets/${imgInp}`:donloadImg} alt="ABV" width="100px" height="100px" />
            </label>
            <input
              type="file"
              id="addImg"
              onChange={(e) => AddNewCategory(e, "image")}
            />
            <div style={{ width: "55px", color: "#FFFFFF" }}>
              <span>загрузить фото</span>
            </div>
          </div>

          <div>
            <MyButton onClick={createNewCat}>добавить</MyButton>
          </div>
        </div>
      </div>
    </div>
  );
};
