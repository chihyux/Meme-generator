import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './store/index'
import Meme from './src/components/meme/meme'

ReactDOM.render(
<Provider store={store}>
        <Meme />
</Provider>
, document.getElementById('app'));

