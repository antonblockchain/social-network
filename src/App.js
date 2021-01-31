import { connect } from "react-redux"
import Appmodule from './components/index'

const mapStatetoProps = (state)=>{
  return{
    state: state
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
  dispatch:dispatch
  }
}

const App = connect(mapStatetoProps,mapDispatchToProps)(Appmodule)

export default App