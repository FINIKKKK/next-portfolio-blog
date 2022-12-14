import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { userActions } from "../redux/user/slice";

const allActions = {
  ...userActions
}

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch)
}