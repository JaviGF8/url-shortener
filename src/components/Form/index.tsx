import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { validateUrl } from 'utils/validator';

import { FormProps } from './index.d';
import './index.scss';

const Form: FC<FormProps> = ({ loading, onClear, onSubmit }) => {
  const [valid, setValid] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    setValid(validateUrl(val));
  };

  const clear = () => {
    setValue('');
    setValid(false);

    if (onClear) {
      onClear();
    }
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form className="form" onSubmit={submit}>
      <TextField
        autoComplete="off"
        disabled={!!loading}
        label="Url"
        error={!!value && !valid}
        onChange={onChange}
        value={value}
        variant="outlined"
      />
      <div className="buttons">
        <Button disabled={!valid || !!loading} variant="contained" type="submit">
          Submit
        </Button>
        <Button
          disabled={!value || !!loading}
          color="secondary"
          onClick={clear}
          variant="outlined"
          type="button"
        >
          Clear
        </Button>
      </div>
    </form>
  );
};
export default Form;
