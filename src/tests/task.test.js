import React from 'react';
import ReactDOM from 'react-dom';
import Task from '../components/task/task';
import {shallow, mount} from 'enzyme';




describe('Task test', ()=>{
    const wrapper = mount(<Task/>);
    const input = wrapper.find('input');
    beforeEach(()=>{
       const form = wrapper.find('form');
       form.simulate('submit', {
           target: {value: 'New york'}
       });

    });

    it('should add value', ()=>{

        input.simulate('change', {
            target: {
                value: 'moscow',
            }
        });

        expect(wrapper.state().inputValue).toEqual(['moscow'])
    });

    it('should li exist', ()=>{
       const li = wrapper.find('li');

       expect(li.length).toEqual(1)
    });

    it('should delete task', ()=>{
        const button = wrapper.find('button.buttonDelete').first();
        button.simulate('click', ()=>{

        });
        expect(button.length).toEqual(1)
    });


});

