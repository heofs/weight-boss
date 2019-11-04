import React, { useState } from 'react';
import styled from 'styled-components';
import { useFirestore } from 'enhancers/useFirestore';
import SubmitButton from './SubmitButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ReactComponent as Box } from 'images/box.svg';
import ImageInput from './ImageInput';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 1em;
`;

const FlexRow = styled.div`
  display: flex;
  max-width: 100vw;
`;

const InputForm = () => {
  const { addWeight } = useFirestore();
  const [weight, setWeight] = useState('');
  const [dateTime, setDateTime] = useState(new Date());

  return (
    <Wrapper>
      <FlexRow>
        <ImageInput icon={Box}>
          <Input
            type="number"
            name="weight"
            id="weightId"
            placeholder="your weight"
            value={weight}
            onChange={event => setWeight(event.target.value)}
          />
        </ImageInput>
        <ImageInput icon={Box}>
          <DatePicker
            selected={dateTime}
            onChange={dateTime => setDateTime(dateTime)}
          />
        </ImageInput>
        <ImageInput icon={Box}>
          <DatePicker
            selected={dateTime}
            onChange={dateTime => setDateTime(dateTime)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </ImageInput>
      </FlexRow>

      <SubmitButton onClick={() => addWeight(weight, dateTime.getTime())}>
        Submit weight
      </SubmitButton>
    </Wrapper>
  );
};

export default InputForm;
