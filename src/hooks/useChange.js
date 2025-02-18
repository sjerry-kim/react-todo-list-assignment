import { useState } from 'react';

const useChange = (setJsonData) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const { type, name, value: inputValue } = e.target;

    if (type === 'checkbox') {
      const checked = e.target.checked;

      setValue((prevState) =>
        typeof prevState === 'string' ? [name] : checked ? [...prevState, name] : prevState.filter((item) => item !== name),
      );

      setJsonData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setValue(inputValue);

      setJsonData((prevData) => ({
        ...prevData,
        [name]: inputValue,
      }));
    }
  };

  return { value, handleChange };
};

export default useChange;
