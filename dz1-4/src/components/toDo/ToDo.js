import React, { useState } from 'react';
import classes from './ToDo.module.css';
import { Button } from '../button/Button';
import Input from '../input/Input';


const ToDo = ({ task, handleDelete, handleDone, handleEdit, handleCurrentEdit, isEdit }) => {
  const [input, setInput] = useState(task.title)
  if  (isEdit) {
    return<div className={classes.edit}>
      <input
        type='text'
        value={input}
        onChange={event=> setInput(event.target.value)}/>
        <ul className={classes.buttons}>
            <li>
                <Button
                onClick={()=> {
                    handleEdit({...task, title: input})
                    handleCurrentEdit(isEdit = false)
                }}
                text={'Save'}/>
            </li>
            <li>
                <Button
                onClick={() => handleCurrentEdit(isEdit = false)}
                text={'Cansel'}/>
            </li>
        </ul>
    </div>
  }
  let isDone = "false"
  if (task.completed){
      isDone = "true"
  }
  const classname = classes.task +" "+ isDone
  return (
    <li className={classname}>
        <ul>
            <li><p>ID: {task.id}</p></li>
            <li><p>Title: {task.title}</p></li>
        </ul>
        <ul className={classes.buttons}>
            <li><Button onClick={() => handleCurrentEdit(task.id)} text={'Edit'}/></li>
            <li><Button onClick={() => handleDone(task.id)} text={'Done'}/></li>
            <li> <Button onClick={() => handleDelete(task.id)} text={'delete'}/></li>
        </ul>
    </li>
  );
};

export default ToDo;
