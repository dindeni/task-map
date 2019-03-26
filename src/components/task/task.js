import React, {useState,Component} from 'react';

import styles from './task.module.css';

class Task extends Component{
    /*const [inputValue, setInputValue] = useState(null);
    const [formValue, setFormValue] = useState([]);
    const [dragElementStart, setDragElementStart] = useState(null);*/

  /*  let tasks;
    if(tasks === undefined){
        tasks = []
    }*/

  state = {
      formValue: [],
      inputValue: [],
      dragElementStart: []
};


    getFormValue = (evt)=>{
        evt.preventDefault();
        /*const value = [...this.props.formValue,...this.props.inputValue];*/
        /*this.setState({formValue: ()=>[...this.props.formValue,
                ...this.props.inputValue]});*/
        this.setState((prevState)=>{
           return{
               formValue: [...prevState.formValue, ...this.state.inputValue]
           }
        });


    };


    getInputValue = (evt)=>{
        this.setState({inputValue: [evt.target.value]});

    };

    onDragStart = (evt, index)=>{
        evt.dataTransfer.effectAllowed = "move";
        evt.dataTransfer.setData("text/html", evt.target.parentNode);

        this.setState({dragElementStart:
                this.state.formValue[evt.target.value]})


        /*evt.dataTransfer.setDragImage(evt.target.parentNode, 0, 0);*/
        /*console.log(evt.target.value)*/
    };

    onDragOver = (index)=>{
        let filteredItems = this.state.formValue.filter((value)=>{
            return value !== this.state.dragElementStart;
        });
        filteredItems.splice(index, 0,
            this.state.dragElementStart);
        this.setState({formValue: filteredItems});

    };

    DeleteItem = (evt)=>{

        const filteredItem = this.state.formValue.filter((value)=>{
            return value !== evt.target.value
        });
        this.setState({formValue: filteredItem});
    };


    render() {
        let list;
        if (this.state.formValue){
            list = (
                this.state.formValue.map((value, index)=>{
                    return(
                        <li key={index} className={styles.taskElement}
                            draggable onDragStart={(evt)=>this.onDragStart(evt, index)}
                            onDragOver={()=>this.onDragOver(index)}>
                            {value}
                            <button className={styles.buttonDelete} value={value}
                                    onClick={this.DeleteItem}>

                            </button>
                        </li>

                    )
                })
            );
        }


        return(
            <section>
                <form onSubmit={this.getFormValue}>
                    <input type="text" name="input-task" className={styles.input}
                           onChange={this.getInputValue} placeholder="add point"/>
                </form>
                <ul className={styles.taskElementContainer}>{list}</ul>
            </section>
        );
    }



}

export default Task;