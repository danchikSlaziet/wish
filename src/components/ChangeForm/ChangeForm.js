import { useState } from 'react';
import './ChangeForm.css';
const ChangeForm = ({ currentID, image, setImage, onImageChange, changeItem }) => {
  const [value, setValue] = useState('');
  const [heading, setHeading] = useState('');
  const [priority, setPriority] = useState('');
  const placeholders = ['Введите заголовок', 'Введите описание', 'Введите приоритет'];
  const hooks = [[heading, setHeading], [value, setValue], [priority, setPriority]];
  return (
    <form encType="multipart/form-data" className='form' onSubmit={(evt) => {
      evt.preventDefault();
      changeItem(value, heading, image, priority, currentID);
      setValue('');
      setHeading('');
      setPriority('');
      setImage('');
    }}>
      {
        placeholders.map((elem, index) => {
          return (<input value={hooks[index][0]} onChange={(evt) => { hooks[index][1](evt.target.value) }} placeholder={elem} className='input' key={index + 5} required />)
        })
      }
      <label className="input-file">
        <input type="file" name="file" accept='image/*' onChange={onImageChange} required />
        <span>Выберите файл</span>
      </label>
      <button type='submit' className='button' >Сохранить</button>
    </form>
  );
};


export default ChangeForm;