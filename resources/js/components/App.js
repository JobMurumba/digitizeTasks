import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Header from './Header';
import ProjectList from './ProjectList';
import NewProject from './NewProject';
import SingleProject from './SingleProject';
class App extends Component{
    render(){
        return(
            <BrowserRouter>
            <div>
                <Header/>
                <Switch>
                <Route exact path='/' component={ProjectList}/>
                <Route exact path="/:id" component={SingleProject}/>
                <Route exact path='/create' component={NewProject}/>
               
                </Switch>
            </div>
            </BrowserRouter>
        )
    }
}

export default App;

ReactDOM.render(<App/>,document.getElementById('app'))