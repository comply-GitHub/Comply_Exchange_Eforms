import React, { useState, useRef, forwardRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { FaCalendarAlt } from 'react-icons/fa';
import { TextField, InputAdornment, IconButton } from '@mui/material';

const CustomDatePicker = ({ field, form: { setFieldValue }, ...props }) => {
  const { name, value } = field;
  const [inputValue, setInputValue] = useState(value ? moment(value).format("MM/DD/YYYY") : "");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputValue]);

  const handleChange = (date) => {
    setFieldValue(name, date);
    setInputValue(date ? moment(date).format("MM/DD/YYYY") : "");
  };

  const handleInputChange = (e) => {
    let input = e.target.value;

    // Manage backspace deletion for slashes
    const cursorPosition = e.target.selectionStart;
    if (input[cursorPosition - 1] === '/' && e.nativeEvent.inputType === 'deleteContentBackward') {
      input = input.slice(0, cursorPosition - 1) + input.slice(cursorPosition);
    }

    input = input.replace(/[^0-9/]/g, ''); 
    if (input.length > 10) {
      input = input.slice(0, 10); 
    }

    // Automatically add slashes
    if (input.length >= 2 && input[2] !== '/') {
      input = `${input.slice(0, 2)}/${input.slice(2)}`;
    }
    if (input.length >= 5 && input[5] !== '/') {
      input = `${input.slice(0, 5)}/${input.slice(5)}`;
    }

    setInputValue(input);

    if (input.length === 10) {
      const formattedDate = moment(input, "MM/DD/YYYY", true);
      if (formattedDate.isValid()) {
        setFieldValue(name, formattedDate.toDate());
      }
    } else if (input === "") {
      setFieldValue(name, null); // Allow clearing the date
    }
  };

  // Custom Input for DatePicker with Icon
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <TextField
      inputRef={inputRef}
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="MM/DD/YYYY"
      variant="outlined"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onClick}>
              <FaCalendarAlt className="calendar-icon" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  ));

  return (
    <div className="custom-date-input">
      <DatePicker
        {...field}
        {...props}
        selected={value || null}
        onChange={handleChange}
        customInput={<CustomInput />}
        maxDate={new Date()}
        dateFormat="MM/dd/yyyy"
      />
    </div>
  );
};

export default CustomDatePicker;
