import React, { ReactElement } from "react";
import { useHistory, useParams } from "react-router";

import { useSelectorTS } from "../../../usersHooks/useSelectorTS";
import MyButton from "../../myButton/MyButton";

import s from "./product.module.scss";
import loadImg from "../../../assets/Group42.svg";
import { useDispatchTS } from "../../../usersHooks/useDispatchTS";
import { getDate } from "../../../utils/GetDate";


interface iParams {
  id: string;
}

interface createBlock {
  description: string;
  price: string | number;
}

interface Iimages {
  src: string;
  id: number | null;
}

const AddNewProduct: React.FC = (): ReactElement => {
  const params: iParams = useParams();
  const history = useHistory();
 
  

  const [divs] = React.useState<number[]>([1, 2, 3, 4, 5]);

  const [images, setImages] = React.useState<Iimages[]>([]);

  const [createItem, setCreateItem] = React.useState<createBlock>({
    description: "",
    price: "",
  });

  const {currentgender,currentTypeID} = useSelectorTS((state) => state.main);
  const {createNewProduct}=useDispatchTS()

  const createNewItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    switch (name) {
      case "file":
        if (e.target.files) {
          const imgPath = e.target.files;

          if (imgPath[0]) {
            if (images.length > 5) {
              alert("Максимум 6 фото");
            } else {
              setImages((prev) => [
                ...prev,
                {
                  id: +Date.now(),
                  src: `../../../assets/${imgPath[0].name}`,
                },
              ]);
            }
          }
        }

        break;

      case "descrition":
        setCreateItem((prev) => ({
          ...prev,
          description: e.target.value,
        }));

        break;

      case "price":
        let price = e.target.value.replace(/[^0-9\.]/g, "");

        setCreateItem((prev) => ({
          ...prev,
          price: +price,
        }));
        break;

      default:
        break;
    }
  };
  
  

  React.useEffect(()=>{
if(!currentTypeID){
    history.push(`/main/${params.id}`)

  }
  },[currentTypeID])
  

  const removePhoto = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    photoId: number | null
  ) => {
    e.preventDefault();

    const newImgArr = [...images].filter((el) => el.id !== photoId);

    setImages(newImgArr);
  };

  const newItem = () => {
    let isComplited = false;

    const result: any = {
      ...createItem,
      imgId: +Date.now(),
      gender: currentgender,
      src: images,
      date:getDate(new Date)
    };
    for (let key in result) {
      if (result[key] === "") {
        alert(key);
        isComplited = false;
        break;
      }

      if (result.price <= 0) {
        alert("0>");
        isComplited = false;
        break;
      }
      if (result.src.length < 1) {
        alert("l 1 + ");

        isComplited = false;
        break;
      } else {
        isComplited = true;
        break;
      }
    }
 if(isComplited){
  createNewProduct(result)

  setCreateItem(prev=>({
    ...prev,
    description:"",
    price:''
  }))
  setImages([])
  history.push(`/main/${params.id}`)
 }
     
  };

  return (
    <section>
      <h1>Добавить изделие</h1>
      <MyButton onClick={() => history.push(`/main/${params.id}`)}>
        Назад
      </MyButton>
      <input
        type="file"
        onChange={(e) => createNewItem(e, "file")}
        id="forImg"
      />
      <div className={s.main}>
        <label htmlFor="forImg">
          <div className={s.main_img_blcok}>
            <div className={s.main_img_blcok_main}>
              {images[0] && (
                <div onClick={(e) => removePhoto(e, images[0].id)}>X</div>
              )}
              <img
                src={images[0] ? images[0].src : loadImg}
                alt="img"
                width="100%"
                height="80%"
              />
            </div>

            <div className={s.main_img_blcok_small}>
              {divs.map((el) => {
                return (
                  <div key={el}>
                    {images[el] && (
                      <span onClick={(e) => removePhoto(e, images[el].id)}>
                        X
                      </span>
                    )}

                    <img
                      src={images[el] ? images[el].src : loadImg}
                      alt="img"
                      width="100%"
                      height="80%"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </label>
        <div className={s.main_edit_block}>
        <div >
          <h1>Артикула</h1>
          <input
            type="text"
            onChange={(e) => createNewItem(e, "descrition")}
            maxLength={25}
            value={createItem.description}
          />
        </div>
        <div>
        <h1>Цена</h1>

          <input
            type="text"
            onChange={(e) => createNewItem(e, "price")}
            value={createItem.price}
          />
        </div>
</div>
      </div>

      <MyButton onClick={newItem}>Добавить</MyButton>
    </section>
  );
};

export default AddNewProduct;
