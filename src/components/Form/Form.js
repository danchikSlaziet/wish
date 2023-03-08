import { useState } from 'react';
import './Form.css';
const Form = ({ addTodo, setImage, image, onImageChange }) => {
  const [value, setValue] = useState('');
  const [heading, setHeading] = useState('');
  const [priority, setPriority] = useState('');
  const placeholders = ['Введите заголовок', 'Введите описание', 'Введите приоритет'];
  const hooks = [[heading, setHeading], [value, setValue], [priority, setPriority]];
  return (
    <form encType="multipart/form-data" className='form' onSubmit={(evt) => {
      evt.preventDefault();
      addTodo(value, heading, image, priority);
      setValue('');
      setHeading('');
      setPriority('');
      setImage('');
    }}>
      {
        placeholders.map((elem, index) => {
          return (<input value={hooks[index][0]} onChange={(evt) => { hooks[index][1](evt.target.value) }} placeholder={elem} className='input' key={index} />)
        })
      }
      <label className="input-file">
        <input type="file" name="file" accept='image/*' onChange={onImageChange} />
        <span>Выберите файл</span>
      </label>
      <button type='submit' className='button'>Сохранить</button>
    </form>
  );
};

export default Form;