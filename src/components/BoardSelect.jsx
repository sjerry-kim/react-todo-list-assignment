import { useRecoilState } from 'recoil';
import { boardAtom } from 'recoil/boardAtom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BoardSelect = () => {
  const [boardState, setBoardState] = useRecoilState(boardAtom);
  const selectList = [
    { idx: 1, title: '최신 순', ascending: false },
    { idx: 2, title: '오래된 순', ascending: true },
  ];

  const handleSelectChange = (event) => {
    const selectedIdx = event.target.value;

    const selectedOption = selectList.find((item) => item.idx === selectedIdx);
    setBoardState((prev) => ({
      ...prev,
      select: selectedOption,
    }));
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select
        name={'boardSelect.idx'}
        value={boardState.select.idx}
        onChange={handleSelectChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        variant="outlined"
      >
        {selectList.map((item, index) => (
          <MenuItem value={item.idx} key={index}>
            <em>{item.title}</em>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BoardSelect;
