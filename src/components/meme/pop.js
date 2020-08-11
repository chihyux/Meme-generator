import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createMeme } from '../../../actions/meme'

class PopBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text0: '',
            text1: ''
        }
    }

    postMeme(e) {
        e.preventDefault();
        if (this.state.text0 === '' || this.state.text1 === '') {
            alert('please fill all input')
        } else if (this.props.getImgId === '') {
            alert('Select one pic')
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
            <div className='pop'>
                <form>
                    <div>
                        <span>Top Text : </span>
                        <input type='text'
                            placeholder='add text to the top...'
                            value={this.state.text0}
                            onChange={e => this.setState({ text0: e.target.value })}
                        />
                    </div>
                    <br />
                    <div>
                        <span>Bottom Text : </span>
                        <input type='text'
                            placeholder='add text to the buttom...'
                            value={this.state.text1}
                            onChange={e => this.setState({ text1: e.target.value })}
                        />
                    </div>

                    <br />
                    <button onClick={e => this.closePop(e)}>Close</button>
                    <button onClick={e => this.postMeme(e)}>Submit</button>
                </form>
            </div>
        )
    }
}

//傳入store參數     
const mapStateToProps = state => {
    return {
        getImgId: state.getImgId
    }
}

const mapDispatchToProps = dispatch => ({
    createMeme: bindActionCreators(createMeme, dispatch)
})


export default connect(
    mapStateToProps
    , mapDispatchToProps)(PopBox)