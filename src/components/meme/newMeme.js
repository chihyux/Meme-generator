import React from 'react'
import { connect } from 'react-redux'

const NewMeme = ({newMeme}) => {
    return (
      <div className='memeWrapper'>
        {
          newMeme.map((meme, index) => {
            return(
              <div className='newMemes'>
                <img key={index} src={meme.data.url} />
              </div>
            )
          })
        }
      </div>
    )
  }

 const mapStateToProps = (state) => {
    return {
      newMeme: state.newMeme
    }
  }

export default connect(mapStateToProps, null)(NewMeme)