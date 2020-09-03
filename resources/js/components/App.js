import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Header from './Header';
import ProjectList from './ProjectList';
import NewProject from './NewProject';
import SingleProject from './SingleProject';
import Register from './register';
import Login from './Login';
class App extends Component{
    render(){
        return(
            <BrowserRouter>
            <div>
                <Header/>
                <Switch>
                <Route exact path='/' component={ProjectList}/>
                <Route exact path='/create' component={NewProject}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/:id" component={SingleProject}/>
               
                
               
                </Switch>
            </div>
            </BrowserRouter>
        )
    }
}

export default App;

ReactDOM.render(<App/>,document.getElementById('app'))