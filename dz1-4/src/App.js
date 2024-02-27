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
    const [ tasks, setTasks ] = useState([]
    );
    const [ originalTasks, setOriginalTasks ] = useState(tasks)
    const handleAdd = () => {
        setTasks(prev=>[...prev,
            {
                id: tasks.length === 0 ? 1 : tasks[tasks.length-1].id +1,
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

    const [filterOption, setFilterOption] = useState('all')
    const handleFilterChange = (event) => {
        setFilterOption(event.target.value)
    }

    const filterTasks = tasks.filter(task => {
        switch (filterOption) {
            case 'completed' :
                return task.completed;
            case 'notCompleted' :
                return !task.completed;
            default:
                return true
        }
    })

    useEffect(() => {
        const myLocalList = JSON.parse(localStorage.getItem('tasks'))
        if (myLocalList === null) {
            return localStorage.setItem('tasks', JSON.stringify(tasks))
        }
        if (myLocalList.length !== 0 ) {
            setTasks(myLocalList)
        }
    }, []);

    useEffect(()=>{
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

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
            <select value={filterOption} onChange={handleFilterChange}>
                <option value="all">Все таски</option>
                <option value="completed">Выполненные</option>
                <option value="notCompleted">Не выполненные</option>
            </select>
            <ToDoList
                tasks={filterTasks}
                handleDelete={handleDelete}
                handleDone={handleDone}
                handleEdit={handleEdit}
            />
        </>
    );
}

export default App;
