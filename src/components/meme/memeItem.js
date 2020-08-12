import React from "react";
import { connect } from "react-redux";
import { getImgId } from "../../../actions/meme";

const MemeItem = ({ meme, getImgId }) => {
  function selected() {
    document.body.classList.add("no-scroll");
    getImgId(meme.id);
  }
  return (
    <div key={meme.id} onClick={() => selected()} className="memes">
      <img src={meme.url}></img>
    </div>
  );
};

export default connect(null, { getImgId })(MemeItem);
