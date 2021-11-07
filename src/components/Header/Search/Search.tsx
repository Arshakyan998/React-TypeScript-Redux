import React from "react";

import { useDispatchTS } from "../../../usersHooks/useDispatchTS";
import { useSelectorTS } from "../../../usersHooks/useSelectorTS";

import s from './search.module.scss'

interface Props {
  currentProductId: number | null;
  currentTypeId: number | null;
}

export const Search: React.FC<Props> = React.memo(
  ({ currentProductId, currentTypeId }) => {
    const { filteredDate } = useDispatchTS();

    const searchProudct: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      filteredDate(e.target.value);
    };

    const { products, currentgender } = useSelectorTS((state) => state.main);

    const productName = products.find((el) => el.id === currentProductId);
    const typeName = productName?.types.find((el) => el.typeId===currentTypeId)?.typeName;
  
    
       
    return (
      <div className={s.main}>
        <nav >
          <div >
            <form>
              <div className="input-field" style={{position:'relative'}}>
                <input
                  id="search"
                  type="search"
                  onChange={searchProudct}
                  placeholder={
                    productName &&
                    `${productName?.category}/${typeName}/${currentgender}`
                  }
                />
                <div className={s.magnifying_glass}>
                🔍
                </div>
              </div>
            </form>
          </div>
        </nav>
      </div>
    );
  }
);
