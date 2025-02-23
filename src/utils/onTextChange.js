const onTextChange = (setData) => {
  const handleChange = (e) => {
    const { type, name, value: inputValue, checked } = e.target;

    if (type === 'checkbox') {
      setData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (name === 'text') {
      const filteredValue = inputValue
        .replace(/\s{3,}/g, ' ')
        .replace(/\n{3,}/g, '\n')
        .slice(0, 30);

      // modalAtom text
      if (name === 'text') {
        setData((prevData) => ({
          ...prevData,
          data: {
            ...prevData.data,
            [name]: filteredValue,
          },
        }));
      }
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: inputValue,
      }));
    }
  };

  return { handleChange };
};

export default onTextChange;
