import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.js';

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            _id: '',
            tasks: []
        }
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e){
        const { name, value} = e.target;
        this.setState({
            [name] : value
        });        
    }

    getTasks(){

        fetch('/api/tasks')
         .then(res => res.json())
         .then(data => {
            this.setState({tasks: data});
            console.log(this.state);
         })
         .catch(err => console.log(err));

    }

    editTask(id){
        fetch(`/api/tasks/${id}`)
         .then(res => res.json())
         .then(data => {
             console.log(data);
             this.setState({
                 title: data.title,
                 description: data.description,
                 _id: data._id
             });
         });
    }

    deleteTask(id){
        if(confirm("Estas seguro de eliminar?")){
            fetch(`/api/tasks/${id}`,{
                method: 'DELETE',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then( res => res.json())
            .then( data => {
                console.log(data);
                M.toast({html:'task deleted'});
                this.getTasks();
            })
            .catch( err => console.log(err));
        }
    }

    componentDidMount(){
        this.getTasks();
    }

    addTask(e) {
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
             .then(res => res.json())
             .then(data => {
                 console.log(data);
                 this.setState({
                     title:'',
                     description: '',
                     _id : ''
                 })
                 this.getTasks();
             })
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
                    this.getTasks();
                    M.toast({ html:"Task aggregate!"});
                })
                .catch(err => console.log(err));
            console.log(this.state);
        }
        e.preventDefault();
    }

    render(){
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col s5">
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
                        </div>

                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th> Title</th>
                                        <th> Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map( (task) => (
                                            <tr key={task._id}>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>
                                                    <button className="btn light-blue darken-4"  onClick={ () => this.deleteTask(task._id)}>
                                                        <i className="material-icons">delete</i>
                                                    </button>
                                                    <button className="btn light-blue darken-4" onClick={ () => this.editTask(task._id) } style={{margin: '4px'}}>
                                                        <i className="material-icons">edit</i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                
                        </div>                        

                    </div>
                </div>
                
            </div>
        );
    }

};

ReactDOM.render(<App />, document.getElementById('app'));