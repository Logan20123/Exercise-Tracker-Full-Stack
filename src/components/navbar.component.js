import React,{Component} from "react";
import {Link} from "react-router-dom";
//displays navbar with bootstrap
export default class Navbar extends Component{
    render(){
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className = "navbar-brand">Exercise Tracker</Link>
                <div >
                    <ul className= "navbar-nav mr-auto">
                        <div className="collapse navbar-collapse">
                        <li className="navbar-item">
                           <Link to="/" className="nav-link">Exercises</Link> 
                        </li> 
                        </div>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Exercise Log</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Create User</Link>
                        </li>
                    </ul>   
                </div>    
            </nav>
        );
    }
}