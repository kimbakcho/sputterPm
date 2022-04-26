
import './styles/quasar.sass'
import lang from 'quasar/lang/ko-KR.js'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import {Dialog} from "quasar";

// To be used on app.use(Quasar, { ... })
export default {
  config: {
  },
  plugins: {
    Dialog
  }
  ,
  lang: lang
}