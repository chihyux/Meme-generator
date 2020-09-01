import React from "react";
import { fetchMemes } from "../../../actions/meme";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MemeItem from "./memeItem";
import NewMeme from "./newMeme";
import PopBox from "./pop";

class Meme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollHeight: 0,
      memeLimit: 10,
      hasMore: true,
    };
    this.scrollDom = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.props.fetchMemes();
    this.setState({
      scrollHeight: window.innerHeight + 1,
    });
    window.addEventListener("scroll", this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll, true);
  }

  handleScroll() {
    if (this.props.meme.length === this.state.memeLimit) {
      this.setState({
        hasMore: false,
      });
      return;
    }
    if (this.scrollDom.current) {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (
        scrollTop + window.innerHeight >
        this.scrollDom.current.scrollHeight
      ) {
        this.setState({
          memeLimit: this.state.memeLimit + 5,
        });
      }
    }
  }

  render() {
    return (
      <div className="meme" style={{ minHeight: this.state.scrollHeight }}>
        <h1>Meme Generator</h1>
        {this.props.newMeme.length > 0 && (
          <div className="newMeme">
            <h4>Congrats! Here is your new meme.</h4>
            <NewMeme />
          </div>
        )}
        <h2>create your MEME ! </h2>
        {this.props.getImgId && <PopBox />}
        <div
          className="memeWrapper"
          ref={this.scrollDom}
          onScroll={this.handleScroll}
        >
          {this.props.meme.slice(0, this.state.memeLimit).map((meme) => (
            <MemeItem meme={meme} />
          ))}
        </div>
        <span className="scroll-text">
          {this.state.hasMore ? "...Scroll to Load More" : "no more meme"}
        </span>
      </div>
    );
  }
}
//傳入store參數
const mapStateToProps = (state) => {
  return {
    meme: state.meme,
    getImgId: state.getImgId,
    newMeme: state.newMeme,
  };
};

const mapDispatchToProps = (dispatch) => ({
  //  fetchMemes: () => dispatch(fetchMemes())
  // 等於
  fetchMemes: bindActionCreators(fetchMemes, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meme);
