import React, {Component} from 'react';

import styles from './task.module.css';
import Map from '../../components/map/map';

class Task extends Component{

  state = {
      formValue: [],
      inputValue: [],
      coords: []
};

    getFormValue = (evt)=>{
        evt.preventDefault();
        this.setState((prevState)=>{
           return{
               formValue: [...prevState.formValue, ...this.state.inputValue]
           }
        });
    };

    getInputValue = (evt)=>{
        this.setState({inputValue: [evt.target.value]});
    };

    onDragStart = (evt)=>{
        evt.dataTransfer.effectAllowed = "move";
        evt.dataTransfer.setData("text/html", evt.target.parentNode);
        //coords start
        this.formValueStart = evt.target.value;

    };

    onDragEnter = (evt, index)=>{
        //index event enter
        this.enter = index;
    };

    onDragEnd = ()=>{
        //filter form value
        let filteredItems = this.state.formValue.filter((value, index)=>{
            if (index !== this.formValueStart){
                return value;
            }
        });
        //enter changed value
        filteredItems.splice(this.enter, 0,
            this.state.formValue[this.formValueStart]);
            this.setState({formValue: filteredItems});
            //filter coordinates
            const filteredCoords = this.state.coords.filter((coord, index)=>{
                if (index !== this.formValueStart){
                    return coord
                }
            });
            //enter changed coordinates
            filteredCoords.splice(this.enter, 0, this.state.coords[this.formValueStart]);
            this.setState({coords: filteredCoords});
    };

    DeleteItem = (evt)=>{
        const filteredItem = this.state.formValue.filter((value, index)=>{

            if (value !== evt.target.value){
                return value
            } else {
                this.indexDeletedValue = index;
                const filtredCoords = this.state.coords.filter((coord, index)=>{
                    if (index !== this.indexDeletedValue){
                        return value
                    }
                });
                this.setState({coords: [...filtredCoords]});
            }
        });
        this.setState({formValue: filteredItem});

    };

    getCoordinates(place){

            const apiKey = 'd659a4d9-8abd-480f-a0e6-551e9f5438c0';
            const url = 'https://geocode-maps.yandex.ru/1.x/?apikey=' + apiKey +
                '&geocode=' + place + '&kind=locality&lang=en_US&format=json';

            return fetch(url)
                .then((res)=>{
                    return res.json()
                })
                .then((data)=>{
                    return data.response.GeoObjectCollection.featureMember[0].
                        GeoObject.Point.pos
                })
                .catch((err)=>{
                    console.log(err)
                });

    }

    componentDidUpdate(prevProps, prevState) {
        //if new data is added get las coordinate
        if (prevState.formValue.length < this.state.formValue.length){
            this.getCoordinates(
                this.state.formValue[this.state.formValue.length-1]).
            then((val)=>{
                return this.setState({coords: [...this.state.coords,
                        [val.slice(9), val.slice(0, 9)]]});
            });
        }
    }

    render() {
        console.log(this.state.formValue);
        let list;
        if (this.state.formValue){
            list = (
                this.state.formValue.map((value, index)=>{
                    return(
                        <li key={index} value={value} className={styles.taskElement}
                            draggable onDragStart={(evt)=>this.onDragStart(evt, value)}
                            onDragEnter={(evt)=>this.onDragEnter(evt, index)}
                        onDragEnd={(evt)=>this.onDragEnd(evt, index)}>
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
            <article className={styles.article}>
                <section>
                    <form onSubmit={this.getFormValue}>
                        <input type="text" name="input-task" className={styles.input}
                               onChange={this.getInputValue} placeholder="add point"/>
                    </form>
                    <ul className={styles.taskElementContainer}>{list}</ul>

                </section>
                <Map formValue={this.state.formValue}
                coords={this.state.coords}/>
            </article>



        );
    }

}
export default Task;