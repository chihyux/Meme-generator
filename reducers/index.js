import { combineReducers } from "redux";
import { memeReducer, newMeme, getImgId } from "./meme";

const rootReducer = combineReducers({
  meme: memeReducer,
  newMeme: newMeme,
  getImgId,
});

export default rootReducer;
