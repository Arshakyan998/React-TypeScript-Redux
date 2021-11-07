import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";


import * as mainActions from "../redux/actions/Main";
import * as LargeImgActions from '../redux/actions/LargeImg'

export const useDispatchTS = () => {
  const result = {
    ...mainActions,
    ...LargeImgActions
  };
   
  const dispatch = useDispatch();
  return bindActionCreators(result, dispatch);
};
