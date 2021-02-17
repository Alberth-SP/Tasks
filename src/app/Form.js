import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Form extends Component {


    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            _id: ''
        }
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    editTask(id) {console.log("Editing ....");}
        
    

    
    addTask(e) {
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
             .then(res => res.json())
             .then(data => console.log(data))
             .catch(err => console.log(err));

        } else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }) 
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        title: '',
                        description: '',
                        _id: ''
                    })
                    console.log(data);
                    M.toast({ html:"Task aggregate!"});
                })
                .catch(err => console.log(err));
            console.log(this.state);
        }
        e.preventDefault();
    }

   

    handleChange(e){
        const { name, value} = e.target;
        this.setState({
            [name] : value
        })
    }
    render () {
        return (
            <div className="card">
                <div className="card-content">
                    <form onSubmit={this.addTask}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input 
                                    type="text"
                                    placeholder="Enter Title"
                                    name="title"
                                    onChange={this.handleChange}
                                    value={this.state.title}
                                />                                
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea 
                                    placeholder="Enter Description"
                                    className="materialize-textarea"
                                    name="description"
                                    onChange={this.handleChange}
                                    value={this.state.description}
                                > </textarea>                         
                            </div>
                        </div>
                        <button className="btn light-blue darken-4" type="submit" >Send</button>
                        
                        
                    </form>
                </div>
            </div>

        );
    }

};

export default Form;