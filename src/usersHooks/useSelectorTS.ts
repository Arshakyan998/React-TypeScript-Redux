import { TypedUseSelectorHook, useSelector } from "react-redux";
import { actionsType } from "../redux/root";

export const useSelectorTS:TypedUseSelectorHook<actionsType>=useSelector
