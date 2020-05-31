import React from 'react'
import { connect } from 'react-redux'

const NewMeme = ({newMeme}) => {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap'}}>
        {
          newMeme.map((meme, index) => {
            return(
              <div style={{ margin: 5 }}>
                <img style={{width: 150 }} key={index} src={meme.data.url} />
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