import React,{Component} from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"

export default class EditExercise extends Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            description:"",
            duration:0,
            date:new Date(),
            users:[]
        }
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangedescription=this.onChangedescription.bind(this);
        this.onChangeDuration=this.onChangeDuration.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    onChangeUsername(name){
        this.setState({
            username:name.target.value
        })
    }

    onChangedescription(description){
        this.setState({
            description:description.target.value
        })
    }

    onChangeDuration(duration){
        this.setState({
            duration:duration.target.value
        })
    }
    onChangeDate(date){
            this.setState({
                date:date
            })
        }

    onSubmit(e){
        e.preventDefault();
        const exercise={
            username:this.state.username,
            description:this.state.description,
            duration:this.state.duration,
            date:this.state.date
        }

        console.log(exercise);
        axios.post("http://localhost:3000/exercise/update/"+this.props.match.params.id,exercise) //id in param
                .then(res=>console.log(res.data));
        window.location="/"
    }

    componentDidMount(){
        axios.get("http://localhost:3000/exercise/"+this.props.match.params.id) //get the exercise
        .then(response=>{
            this.setState({
                username:response.data.username,
                description:response.data.description,
                duration:response.data.duration,
                date:new Date(response.data.date)
            })
        })
        .catch((err)=>{
            console.log(err);
        })

        axios.get("http://localhost:3000/user/")    //get the user
        .then(response=>{
            if(response.data.length>0){
                this.setState({
                    users:response.data.map(user=>user.username),
                    username:response.data[0].username
                })
            }
        })
    }

    render(){
        return(
            <div>
            <h3>Edit Exercise</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select ref="userInput"
                        required className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                      {
                          this.state.users.map((user)=>{
                              return <option
                                  key={user}
                                  value={user}>
                                      {user}
                              </option>
                          })
                      }  
                    </select>
                </div>
                <div className="form-group">
                    <label>
                        Description:
                    </label>
                    <input type="text" required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangedescription}/>
                </div>
                <div className="form-group">
                      <label>Duration(in mins)</label>
                      <input type="text" required
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}/>
                </div>
                <div className="form-group">
                <label>Date: </label>
                <div>
                    <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                    />
                </div>
                </div>
                <div className="form-group">
                      <input type="submit" value="Edit Exercise"
                      className="btn btn-primary"/>
                </div>
            </form>
            </div>
        );
    }
}