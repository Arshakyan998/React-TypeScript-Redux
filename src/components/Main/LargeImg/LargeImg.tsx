import React from "react";

import { useDispatchTS } from "../../../usersHooks/useDispatchTS";
import { useSelectorTS } from "../../../usersHooks/useSelectorTS";
import MyButton from "../../myButton/MyButton";

import s from "./largeimg.module.scss";

export const LargeImg: React.FC = (): React.ReactElement => {

  const closeSlider=React.useRef<HTMLDivElement | null >(null)

  const getParendSlideDiv = React.useRef<HTMLDivElement | null>(null);


  const elementsWidths = React.useRef<number | null>(null);

  const { date, isLarge } = useSelectorTS((state) => state.showHideLargeImg);

  const { largeImgDate, showLargeImg } = useDispatchTS();

  const closeModal = () => {
    showLargeImg(false);
    largeImgDate([]);
  };

  const slideLeft = () => {
    getParendSlideDiv.current!.childNodes.forEach((el: any) => {
      el.style.transform = `translate(${elementsWidths.current}px)`;
    });
  };

  const slideRight = () => {
    getParendSlideDiv.current?.childNodes.forEach((el: any) => {
      el.style.transform = `translate(${elementsWidths.current}px)`;
    });
  };

  const slider = (e:React.MouseEvent<HTMLDivElement, MouseEvent>,name: string) => {
    e.stopPropagation()
    const childNodeWidth = Math.round(
      getParendSlideDiv.current!.children[0].getBoundingClientRect().width
    );
    switch (name) {
      case "R":
        elementsWidths.current = elementsWidths.current! - childNodeWidth;

        if (-childNodeWidth * date.length < elementsWidths.current!) {
          slideRight();
        } else {
          elementsWidths.current = 0;
          slideRight();
        }
        break;

      case "L":
        elementsWidths.current = elementsWidths.current! + childNodeWidth;

        if (elementsWidths.current > 0) {
          elementsWidths.current =
            -elementsWidths.current * date.length + childNodeWidth;
          slideLeft();
        } else {
          slideLeft();
        }
        break;
    }
  };
 


 
  return (
    <>
      {isLarge && (
        <div className={s.main_large} onClick={closeModal}>
          
          <div style={{position:'absolute',right:"25px",top:"25px",cursor:'pointer'}}>	&#10006;	 </div>
          <div style={{ position: "relative", width: "45%" }} >
            <div className={s.main_large_slider} ref={getParendSlideDiv} onClick={(e)=>e.stopPropagation()}>
              {date.map((el) => {
                return (
                  <div key={el.id} className={s.main_large_slider_img_block}>
                    <img src={el.src} alt="" width="100%" height="100%" />
                  </div>
                );
              })}
            </div>
            {date.length > 1 && (
            <div>
              <div onClick={(e) => slider(e,"L")} className={s.left_slide}> 	&lt; </div>
              <div onClick={(e) => slider(e,"R")} className={s.right_slide}> &gt; </div>
            </div>
          )}
          </div>

          
        </div>
      )}
    </>
  );
};
