import { useState } from 'react';
import ChangeForm from '../components/ChangeForm/ChangeForm';
import Form from '../components/Form/Form';
import Modal from '../components/Modal/Modal';
import './App.css';
let currentID;
let currentSrc;
function App() {
  const [sumTodos, setSumTodos] = useState(0);
  const [completeTodos, setCompleteTodos] = useState(0);
  const [todos, setTodos] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [changeModal, setChangeModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [image, setImage] = useState(null);

  const changeItem = (value, h, url, num, ID) => {
    setTodos(todos.map(todo => {
      if (todo.id !== ID) return todo;
      if (todo.id === ID) return {
        ...todo, text: value, heading: h, image: url, priority: num, done: todo.done
      };
    }))
  };

  const sortTodos = () => {
    setTodos(todos.map(todo => todo).sort((x, y) => x.priority - y.priority));
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }
  const addTodo = (value, h, url, num) => {
    setTodos([...todos, { id: Date.now(), text: value, heading: h, done: false, image: url, priority: num }]);
    setSumTodos(sumTodos + 1);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo;
      return {
        ...todo, done: !todo.done
      }
    }))
  };

  const countCompleteTodo = (todo) => {
    if (!todo.done) { setCompleteTodos(completeTodos + 1) }
    else { setCompleteTodos(completeTodos - 1) };
  };

  const removeTodo = (id, todo) => {
    setTodos(todos.filter(todo => todo.id !== id));
    setSumTodos(sumTodos - 1);
    if (todo.done) { setCompleteTodos(completeTodos - 1) };
  };

  const resetAll = () => {
    setTodos([]);
    setSumTodos(0);
    setCompleteTodos(0);
  };


  // не успел нормально реализовать drag n drop



  // const [currentTodo, setCurrentTodo] = useState(null);

  // function dragStartHandler(evt, todo) {
  //   setCurrentTodo(todo);
  // }
  // function dragLeaveHandler(evt) {

  // }
  // function dragEndHandler(evt) {

  // }
  // function dragOverHandler(evt) {
  //   evt.preventDefault();
  // }
  // function dropHandler(evt, todo) {
  //   evt.preventDefault();
  //   setTodos(todos.map((elem) => {
  //     if (elem.id === todo.id) {
  //       return {...elem, order: currentTodo.order}
  //     }
  //     if (elem.id === currentTodo.id) {
  //       return {...elem, order: todo.order}
  //     }
  //     return elem;
  //   }));
  // }

  // const sortDragsCards = (x, y) => {
  //   if (x.order > y.order) {
  //     return 1;
  //   }
  //   else {
  //     return -1;
  //   }
  // };

  return (
    <div className='wrapper'>
      <div className='container'>
        <h1 className='title'>Список желаний</h1>
        <button onClick={() => { setModalActive(true) }} className='button'>Добавить желание</button>
        <ul className='todo-list'>
          {
            todos.map(todo => {
              return (
                <li className={todo.done ? 'todo todo_done' : 'todo'} key={todo.id} onClick={(evt) => {
                  countCompleteTodo(todo);
                  toggleTodo(todo.id);
                }}>
                  <p className='todo-priority'>Приоритет: {todo.priority}</p>
                  <h2 className='todo-heading'>{todo.heading}</h2>
                  <p className='todo-text'>{todo.text}</p>
                  <img src={todo.image} alt="фото желанное" className='wish-img' onClick={(evt) => {
                    evt.stopPropagation();
                    setImageModal(true);
                    currentSrc = todo.image;
                  }} />
                  <img src='./change-icon.png' className='change-icon' onClick={(evt) => {
                    evt.stopPropagation();
                    setChangeModal(true);
                    currentID = todo.id;
                  }} />
                  <img className='delete-icon' src='./trash.png' alt="иконка удаления" onClick={(evt) => {
                    evt.stopPropagation();
                    removeTodo(todo.id, todo);
                  }} />
                </li>
              );
            })
          }
          <div className='info'>
            <span className='info-text'>Все желания: {sumTodos}</span>
            <span className='info-text'>Исполненные желания: {completeTodos}</span>
          </div>
          <div className='buttons'>
            <button className='button' onClick={resetAll}>Очистить список</button>
            <button className='button' onClick={sortTodos}>Сортировать список</button>
          </div >
        </ul>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <Form addTodo={addTodo} setImage={setImage} image={image} onImageChange={onImageChange} />
      </Modal>
      <Modal active={changeModal} setActive={setChangeModal}>
        <ChangeForm currentID={currentID} image={image} setImage={setImage} onImageChange={onImageChange} changeItem={changeItem} />
      </Modal>
      <Modal active={imageModal} setActive={setImageModal}>
        <img src={currentSrc} alt="фото желанное" className='modal-img' />
      </Modal>
    </div>
  );
}

export default App;