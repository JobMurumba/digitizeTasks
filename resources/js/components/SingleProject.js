import axios from 'axios';
import React,{Component} from 'react';


class SingleProject extends Component{
    constructor(props){
        super(props)
        this.state ={
            project:{},
            tasks:[],
            title:'',
            errors:[]
        }

        this.handleMarkProjectAsCompleted = this.handleMarkProjectAsCompleted.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleAddNewTask = this.handleAddNewTask.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    handleFieldChange(e){
        this.setState({
            title:e.target.value
        })
    }

    handleAddNewTask(e){
        e.preventDefault();

        const task = {
            title:this.state.title,
            project_id : this.state.project.id
        }

        axios.post('/api/tasks',task).then(res=>{
            this.setState({
                title:"",

            })

            this.setState(prevState=>({
                tasks:prevState.tasks.concat(res.data)
            }))
            

        })
        .catch(error=>{
            this.setState({
                errors:error.response.data.errors
            })
        })
    }

    hasErrorFor(field){
        if(this.state.errors){
        return !!this.state.errors[field]
    }
    }

    renderErrorFor(field){
        if(this.hasErrorFor(field)){
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.erros[field][0]}</strong>
                </span>
            )
        }
    }
    componentDidMount(){
       
        const projectId = this.props.match.params.id

        axios.get(`/api/projects/${projectId}`)
            .then(res=>{
                this.setState({
                    project:res.data,
                    tasks:res.data.tasks
                })
            })
    }
//ECHAzOZmepB-
    handleMarkProjectAsCompleted(){
        const {history} = this.props

        axios.put(`/api/projects/${this.state.project.id}`)
        .then(res=>history.push('/'))
    }


    handleTaskAsCompleted(taskId){
        axios.put(`/api/tasks/${taskid}`).then(res=>{
            this.setState(prevState=>({
                tasks:prevState.tasks.filter(task=>{
                    return task.id !==taskId
                })
            }))
        })
    }
    render(){
        const {project,tasks} = this.state;

        return(
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                {project.name}
                            </div>
                            <div className="card-body">
                                <p>{project.description}</p>

                                <button className="btn btn-primary btn-sm"
                                 onClick={this.handleMarkProjectAsCompleted}
                                >Mark as completed</button>
                                <hr />

                                <form onSubmit={this.handleAddNewTask}>
                                <div className="input-group">
                                    <input type='text' name="title"
                                        className={`form-control ${this.hasErrorFor('title')?'is-invalid':''}`}
                                        placeholder='Task title'
                                        value={this.state.title}
                                        onChange={this.handleFieldChange}
                                        />
                                <div className="input-group-append">
                                    <button className='btn btn-primary'>Add</button>

                                </div>
                                {this.renderErrorFor('title')}
                                </div>
                                
                                </form>  

                                    {
                                        this.state.tasks.length>0?(
                                <ul className="list-group mt-3">

                                    {tasks.map(task=>(
                                        <li className='list-group-tem d-flex justify-content-between align-items-center'
                                        key={task.id}>{task.title}
                                         <button className="btn btn-primary btn-sm"
                                        onClick={this.handleTaskAsCompleted.bind(this,task.id)}
                                         
                                         >Mark as completed</button>
                                    </li>
                                    ))}
                                   
                                </ul>

                                                    ):''
                                            }
                                                </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleProject;