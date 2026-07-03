import React from 'react'
import { useState, useRef, useEffect } from 'react'
import './ToDo.css'
import { FiEdit2, FiTrash2,FiX } from "react-icons/fi";

const ToDo = () => {

  const [todos, settodos] = useState([]);//Array containing all todo
  const [todo, settodo] = useState("");
  const inputref = useRef(null)

  useEffect(() => {
    let t = JSON.parse(localStorage.getItem("todos"))
    if (t != null) {
      settodos(t);
    }
  }, [])

  const saveToLS = (newtodos) => {
    localStorage.setItem("todos", JSON.stringify(newtodos))
  }

  const [showinput, setshowinput] = useState(false)
  const [showfinished, setshowfinished] = useState(false)

  useEffect(() => {
    if (showinput) {
      inputref.current?.focus();
    }
  }, [showinput]);

  const popinput = () => {
    setshowinput(true);
  }

  const removepopinput = () => {
    setshowinput(false);
  }

  const toggleTodos = () => {
    setshowfinished(!showfinished);
  }

  const handleEdit = (id) => {
    popinput()
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo);
    let newtodos = todos.filter(item => item.id !== id);
    settodos(newtodos)
    saveToLS(newtodos)
  }

  const handleDelete = (id) => {
    let newtodos = todos.filter(item => item.id !== id);
    settodos(newtodos)
    saveToLS(newtodos)
  }

  const handleAdd = () => {
    if(todo.trim()==="") return;
    let newtodos = [...todos, { id: Date.now(), todo, isCompleted: false }];
    settodos(newtodos)
    settodo("");
    saveToLS(newtodos)
    inputref.current.focus();
  }

  const handleChange = (id) => {
    let newtodos = todos.map(item => {
      if (item.id === id) return ({ ...item, isCompleted: !item.isCompleted });
      return item;
    })
    settodos(newtodos)
    saveToLS(newtodos)
  }

  return (
    <div className='ToDo'>
      <div className="card">
        <div className="header">
          <div>
            <h2>Your TODOs</h2>
            <input type='checkbox' checked={showfinished} onChange={toggleTodos}/>Finished Todos
          </div>
          <div className="add">
            <button className='adding' onClick={popinput}>Add a ToDo</button>
          </div>
        </div>
        <hr></hr>
        <div className={showinput ? "newtodo" : "hidden"}>
          <input ref={inputref} type='text' value={todo} onChange={(e) => settodo(e.target.value)} onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAdd();
            }
          }} />
          <button className='saving' onClick={handleAdd}>Add</button>
          <button className='remove' onClick={removepopinput}><FiX/></button>
        </div>
        <div className="todos">
          {todos.length==0?(
            <div className="empty">Click "Add a Todo" to get started.</div>
          ):
          todos.map((item) => {
            return (showfinished || !item.isCompleted)&&<div key={item.id} className="todo">
              <div className="checkbox">
                <input type='checkbox' checked={item.isCompleted} onChange={() => handleChange(item.id)}></input>
              </div>
              <div className={item.isCompleted ? 'text strikeoff' : 'text'}>{item.todo}</div>
              <div className="edit"><button onClick={() => handleEdit(item.id)}><FiEdit2 /></button></div>
              <div className="delete"><button onClick={() => { handleDelete(item.id) }}><FiTrash2 /></button></div>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default ToDo
