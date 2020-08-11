import React from 'react'
import { connect } from 'react-redux'
import { getImgId } from '../../../actions/meme'

class MemeItem extends React.Component {
    selected() {
        //使用action 把id傳入store讓父層吃到
        this.props.getImgId(this.props.meme.id)
    }

    render() {
        return (
            <div key={this.props.meme.id}
                onClick={() => this.selected()}
                className='memes'>
                <img src={this.props.meme.url}></img>
            </div>
        )
    }
}

export default connect(null, { getImgId })(MemeItem)