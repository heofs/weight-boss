import React, { useState } from 'react';
import styled from 'styled-components';
import { useFirestore } from 'enhancers/useFirestore';
import moment from 'moment';
import SubmitButton from './SubmitButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 1em;
`;

const FlexRow = styled.div`
  display: flex;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

// const timeNow = () => moment().format('YYYY-MM-DDTHH:mm');

const InputForm = () => {
  const { addWeight } = useFirestore();
  const [weight, setWeight] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  //   const dateTime = () => '12';
  return (
    <Wrapper>
      <FlexRow>
        <InputGroup>
          <label htmlFor="weightId">Your weight</label>
          <Input
            type="number"
            name="weight"
            id="weightId"
            placeholder="your weight"
            value={weight}
            onChange={event => setWeight(event.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="dateId">Date</label>
          <DatePicker
            selected={dateTime}
            onChange={dateTime => setDateTime(dateTime)}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="timeId">Time</label>
          <DatePicker
            selected={dateTime}
            onChange={dateTime => setDateTime(dateTime)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </InputGroup>
      </FlexRow>
      {/* <button onClick={() => setInputs({ ...inputs, dateTime: timeNow() })}>
        Set time now
      </button> */}
      <SubmitButton
        onClick={() => {
          console.log({ weight, dateTime });
          addWeight(weight, dateTime);
        }}
      >
        Submit weight
      </SubmitButton>
    </Wrapper>
  );
};

export default InputForm;
