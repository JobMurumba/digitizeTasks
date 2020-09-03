import React from 'react';



class Login extends React.Component{

    constructor(props){
        super(props)
        this.state ={
           
            email:"",
            password:"",
           
            errors:[],
            touched:{email:false,password:false}
        }

        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.validate = this.validate.bind(this);
        this.renderErr = this.renderErr.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value,
        })
    }
    handleBlur(field){
       
        this.setState({
            touched:{
                ...this.state.touched,
                [field]:true,
            }
        })
    }
    handleSubmit(e){
        e.preventDefault()
        var user = {
           
            email:this.state.email,
            password:this.state.password,
           
        }

        axios.post('/api/login',user).then(res=>{
            
            if(res.data.status_code===200){
                localStorage.setItem('token',res.data.access_token)
            }else{
                alert('bad credentials')
            }
                
                
        
        }).catch(error=>{
            this.setState({
                errors:error.response.data.errors
            })
            
        })

    }

    validate(email,password){
        return{
            
            email:email.length===0,
            password:password.length===0,
            
        } 
    }
    hasErrorFor(field){
        if(this.state.errors){
        return !!this.state.errors[field]
    }
    }

    renderErrorFor(field){
        
        if(this.state.errors){
          
        if(this.hasErrorFor(field)){
            
            return(
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }
    }
    renderErr(field){
        return(
            <span className='invalid-feedback'>
                <strong>{`${field} is required`}</strong>
            </span>
        )
    }
    render(){
        //const {name,email,password,password_confirmed}=this.state;
       
        const errors =this.validate(this.state.email,this.state.password);
        
        const isEnabled = Object.keys(errors).some(x=>errors[x]);
        
        const shouldMarkError = field=>{
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            return hasError?shouldShow:false
        };
        return(
            <div className="container py-4">
            <div className="row justify-content-center">
            <div className="card">
            <div className="card-header">
                Fill the fields to create an Account
            </div>
            <div className="card-header">
            <form onSubmit={this.handleSubmit}>
                
                <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" required className={`form-control ${shouldMarkError('email')?'is-invalid':''} ${this.hasErrorFor('email')?'is-invalid':''}`}  onBlur={this.handleBlur.bind(this,'email')} value={this.state.email} onChange={this.handleChange}/>
                {this.state.errors?this.renderErrorFor('email'):''}
                
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password"  required className={`form-control ${shouldMarkError('password')?'is-invalid':''} ${this.hasErrorFor('password')?'is-invalid':''}`}  onBlur={this.handleBlur.bind(this,'password')} value={this.state.password} onChange={this.handleChange}/>
                {this.state.errors?this.renderErrorFor('password'):''}
                {errors.password?this.renderErr('Password'):""}
                
                </div>
                
                <button className="btn btn-primary" disabled={isEnabled} type="submit">Register</button>
                
            </form>

            </div>
             </div>   
            </div>
            </div>
        )
    }
}

export default Login;