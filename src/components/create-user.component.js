import React,{Component} from "react";
import axios from "axios";

export default class CreateUser extends Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
        }
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    
    onChangeUsername(name){
        this.setState({
            username:name.target.value
        })
    }

    onSubmit(e){
        e.preventDefault(); //prevent default behavior of submit button
        const user={
            username:this.state.username
        }

        console.log(user);
        //adding a user to db
        axios.post("http://localhost:3000/user/add",user)
                .then(res=>console.log(res.data));

        //removing user from state after adding to db
        this.setState({
            username:""
        })
    }
    
    render(){
        return(
            <div>
            <h3>Create Exercise Log</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                   <input type="text" required
                   className="form-control"
                   value={this.state.username}
                   onChange={this.onChangeUsername}/>
            
                </div>
          
                <div className="form-group">
                      <input type="submit" value="Create User"
                      className="btn btn-primary"/>
                </div>
                </form>
            </div>
        );
    }
}