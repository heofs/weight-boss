import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

import { useAPI } from 'enhancers/useAPI';

import SubmitButton from 'components/Buttons/SubmitButton';
import InputBox from './InputBox';

import { ReactComponent as IonWeight } from 'images/icon-weight.svg';
import { ReactComponent as IconClock } from 'images/icon-clock.svg';
import { ReactComponent as IconCalendar } from 'images/icon-calendar.svg';

import 'react-datepicker/dist/react-datepicker.css';

const Wrapper = styled.div`
  width: 100%;
`;

const FlexRow = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const ImageWidth = 100;
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  svg {
    height: ${ImageWidth}px;
    width: ${ImageWidth}px;
  }
`;

const InputForm = () => {
  const { addWeight } = useAPI();
  const [weight, setWeight] = useState('');
  const [dateTime, setDateTime] = useState(new Date());

  const postWeight = () => {
    if (weight) {
      return addWeight(weight, dateTime.getTime());
    }
    return new Promise(function (resolve, reject) {
      setTimeout(() => resolve('missing-weight'), 0);
    });
  };

  return (
    <Wrapper>
      <FlexRow>
        <InputGroup>
          <IonWeight />
          <InputBox
            type="number"
            name="weight"
            min="0"
            id="weightId"
            placeholder="weight"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <IconCalendar />
          <DatePicker
            selected={dateTime}
            onChange={(dateTime) => setDateTime(dateTime)}
            customInput={<InputBox />}
            withPortal={true}
            dateFormat="dd/MM/yy"
            todayButton="Today"
          />
        </InputGroup>
        <InputGroup>
          <IconClock />
          <DatePicker
            selected={dateTime}
            onChange={(dateTime) => setDateTime(dateTime)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            timeCaption="Time"
            dateFormat="h:mm aa"
            customInput={<InputBox />}
            withPortal={true}
          />
        </InputGroup>
      </FlexRow>

      <SubmitButton onSubmit={postWeight}>Submit weight</SubmitButton>
    </Wrapper>
  );
};

export default InputForm;
