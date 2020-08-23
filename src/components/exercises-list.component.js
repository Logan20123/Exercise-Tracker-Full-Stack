import React,{Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

//table for exercise 
const Exercise =props=>(
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link className="btn btn-success" to={"/edit/"+props.exercise._id}>edit</Link> <button className="btn btn-danger" onClick={()=>
                                                                props.deleteExercise(props.exercise._id)}>Delete</button>
        </td>
    </tr>
)

//default page showing table of exercise and user data
export default class ExercisesList extends Component{
    constructor(props){
        super(props);
        this.state={
            exercises:[]
        }
        this.deleteExercise=this.deleteExercise.bind(this);
    }

    componentDidMount(){
        axios.get("http://localhost:3000/exercise/")            //get all exercise
            .then(response=>{
                this.setState({
                    exercises:response.data
                })
            })
            .catch((err)=>console.log(err))
    }
    deleteExercise(id){
        axios.delete("http://localhost:3000/exercise/"+id)      //delete exercise with _id = id
            .then(res=>console.log(res.data));
        this.setState({
            exercises:this.state.exercises.filter(el=>el._id!==id)      //only display non-deleted exercises
        })
    }
    exerciseList(){
        return this.state.exercises.map(currentexercise =>{
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
    }
    render(){
        return(
            <div>
                <h3>Logged Exercise</h3>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration(in mins)</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        );
    }
}