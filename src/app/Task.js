import React , { Component } from 'react';
import { Form } from './Form'
class Task extends Component {

    constructor(){
        super();
        this.state = {
            tasks: []
        };
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

    editTask2(id){
        fetch(`/api/tasks/${id}`)
         .then(res => res.json())
         .then(data => console.log(data))
         .catch(err => console.log(err));
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

    render() {
        return (
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
                                        <button className="btn light-blue darken-4" onClick={ () => Form.editTask(task._id) } style={{margin: '4px'}}>
                                            <i className="material-icons">edit</i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
                
            </div>
        );
    }

};

export default Task;