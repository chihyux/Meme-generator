import { GET_MEME, FETCH_SUCCESS, NEW_MEME, GET_IMGID } from '../constants/action-types'

const memeData = []

const memeReducer = (state = memeData, action) => {
    switch(action.type) {
        case FETCH_SUCCESS: {
            let { data:{memes} } = action.meme
            return [...state, ...memes ]
        }
        case GET_MEME: {
            return [ ...state ]
        }
        default: {
            return state
        }
    }
}

const newMeme = (state=[], action) => {
    switch(action.type) {
        case NEW_MEME: {
            return [...state, action.meme]
        }
        default: {
            return state
        }
    }
}

const getImgId = (state=[], action) => {
    switch(action.type) {
        case GET_IMGID: {
              return [action.id]  
        }
        // post 出去以後清空
        default: {
            return []
        }
    }
}
export { memeReducer , newMeme, getImgId }
