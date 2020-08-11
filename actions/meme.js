import { GET_MEME, FETCH_SUCCESS, NEW_MEME, GET_IMGID } from '../constants/action-types'
import { username, password } from '../src/components/meme/user'

function getMeme() {
  return {
    type: GET_MEME
  }
}

function fetchSuccess(meme) {
  return {
    type: FETCH_SUCCESS,
    meme
  }
}

function newMeme(meme) {
  return {
    type: NEW_MEME,
    meme
  }
}

export function getImgId(meme) {
  return {
    type: GET_IMGID,
    id: meme
  }
}


export const fetchMemes = () => {
  return (dispatch) => {
    dispatch(getMeme())
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(res => dispatch(fetchSuccess(res)))
  }
}

function postMemeJson(params) {
  params['username'] = username;
  params['password'] = password;
  const bodyParams = Object.keys(params).map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
  }).join('&');

  console.log('bodyParams', bodyParams);

  return fetch('https://api.imgflip.com/caption_image', {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: bodyParams
  }).then(response => response.json());
}

export const createMeme = (new_meme_object) => {
  return (dispatch) => {
    postMemeJson(new_meme_object)
      .then(new_meme => dispatch(newMeme(new_meme)))
  }
}


