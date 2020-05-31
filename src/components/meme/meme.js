import React from 'react'
import { fetchMemes } from '../../../actions/meme'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MemeItem from './memeItem'
import { createMeme } from '../../../actions/meme'
import NewMeme from './newMeme'

class Meme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memeLimit: 10,
            text0: '',
            text1: ''
        }
    }
    componentDidMount() {
        this.props.fetchMemes();
    }

    loadMore() {
        this.setState({
            memeLimit: this.state.memeLimit + 10
        })
    }

    postMeme(e) {
        e.preventDefault();
        if (this.state.text0 == '' || this.state.text1 =='') {
            alert ('plz fill all input')
        } else if (this.props.getImgId == '') {
            alert ('select one pic')
        } else {
            const memeObj = {
            template_id: this.props.getImgId,
            text0: this.state.text0,
            text1: this.state.text1
            }
            this.props.createMeme(memeObj) 
            this.setState({
                text0: '',
                text1: ''
            })
            this.props.getImgId = []
        }
    }

    closePop(e) {
        e.preventDefault();
        this.setState({
            text0: '',
            text1: ''
        })
        this.props.getImgId = []
    }

    render() {
            return (
            <div>
                <h1>Meme Generator</h1>
                { this.props.newMeme.length == 0 ?
                    <div></div>
                    :
                    <div className='newMeme'>
                      <h4>Congrats! Here is your new meme.</h4>
                       <NewMeme />  
                    </div>
                }
                <h2>create your MEME ! </h2>

                {
                    this.props.getImgId.length ?
                    <div className='pop'>
                    <form>
                    <div>
                    <span>Top Text : </span>
                    <input type='text' 
                            placeholder='add text to the top...' 
                            value={this.state.text0} 
                            onChange={e => this.setState({text0: e.target.value})}
                    />  
                    </div>
                    <br/>
                    <div>
                    <span>Bottom Text : </span>
                    <input type='text' 
                            placeholder='add text to the buttom...'  
                            value={this.state.text1} 
                            onChange={e => this.setState({text1: e.target.value})}
                    /> 
                    </div>
                
                    <br/>
                    <button onClick={e => this.closePop(e)}>Close</button>
                    <button onClick={e => this.postMeme(e)}>Submit</button>
                    </form>
                    </div>
                    :
                    null
                }
         
                <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                    { this.props.meme.slice(0,this.state.memeLimit).map(meme => 
                        <MemeItem meme={meme} />
                    )}
                </div>
                <div style={{ textAlign: 'center', margin: 20 }}>
                   <button onClick={()=> this.loadMore() }>Load more</button> 
                </div>
            </div>
        )
}
}
//傳入store參數     
const mapStateToProps = state => {
    return { 
        meme: state.meme,
        getImgId: state.getImgId,
        newMeme: state.newMeme
    }
}

const mapDispatchToProps = dispatch => ({
    //  fetchMemes: () => dispatch(fetchMemes())
    // 等於
    fetchMemes: bindActionCreators(fetchMemes,dispatch),
    createMeme: bindActionCreators(createMeme,dispatch)
  })
  

export default connect(
    mapStateToProps
    ,mapDispatchToProps)(Meme)