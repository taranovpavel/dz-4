import './App.css';
import { Button } from './components/button/Button';
import Modal from './components/modal/Modal';
import React, { useEffect, useState } from 'react';
import Input from './components/input/Input';
import ToDoList from './components/toDoList/ToDoList';

function App() {
    const [ show, setShow ] = useState(false);
    const [ input, setInput ] = useState('');
    const [ searchInput, setSearchInput ] = useState('');
    const onChangeInput = (event) => {
        setInput(event.target.value);
    };
    const handleShow = () => {
        setShow(!show);
    };
    const [ tasks, setTasks ] = useState([
            {
                id: 1,
                title: 'coding',
                completed: false
            },
            {
                id: 2,
                title: 'eat',
                completed: false
            },
            {
                id: 3,
                title: 'sleep',
                completed: false
            }
        ]
    );
    const [ originalTasks, setOriginalTasks ] = useState(tasks)
    const handleAdd = () => {
        setTasks(prev=>[...prev,
            {
                id: tasks.length + 1,
                title: input,
                completed: false,
            }
        ]
        );
    };
    const handleDone = (id) => {
        console.log(id);
        tasks.map(task=> {
            if(task.id===id) {
                return task.completed = !task.completed
            }
            return tasks
        })
        setTasks([...tasks])
    }
    const handleDelete = (id) => {
        const deleted = tasks.filter(task=> task.id!==id)
        setTasks(deleted)
    }
    const handleEdit = (editTodo) => {
        console.log(editTodo);
        tasks.map(task=> {
            if(task.id === editTodo.id) {
                return task.title = editTodo.title
            }
            return tasks
        })
        setTasks([...tasks])
    }
    const handleSearch  = (event) => {
        const inputValue = event.target.value
        setSearchInput(inputValue);
        if (inputValue==='')
        {
            setTasks(originalTasks)
        } else {
            const filteredTasks = tasks.filter(task=> task.title.toLowerCase().includes(inputValue.toLowerCase()))
            setTasks(filteredTasks)
        }
    };
    useEffect(() => {
        console.log('useEffect')
    }, [tasks]);
    return (
        <>
            {
                show && <Modal handleShow={handleShow}>
                    <Input
                        placeholder={'Добавить таск'}
                        onChangeInput={onChangeInput}
                    />
                    <Button onClick={handleAdd} text={'добавить'}/>
                </Modal>
            }
            <button onClick={handleShow}>открыть</button>
            <Input
              placeholder={'искать'}
              onChangeInput={handleSearch}
            />
            <ToDoList
              tasks={tasks}
              handleDelete={handleDelete}
              handleDone={handleDone}
              handleEdit={handleEdit}
            />
        </>
    );
}
export default App;
