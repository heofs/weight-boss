import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

import useWindowSize from 'enhancers/useWindowSize';
import { useAPI } from 'enhancers/useAPI';
import { colors } from 'constants/theme';

import SubmitButton from 'App/InputForm/SubmitButton';

import { ReactComponent as IonWeight } from 'images/icon-weight.svg';
import { ReactComponent as IconClock } from 'images/icon-clock.svg';
import { ReactComponent as IconCalendar } from 'images/icon-calendar.svg';

import InputBox from './InputBox';

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

const FormText = styled.h2`
  font-weight: 500;
  color: ${colors.text};
`;

const InputForm = () => {
  const { addWeight } = useAPI();
  const [weight, setWeight] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const size = useWindowSize();

  return (
    <Wrapper>
      <FormText>Add your weight</FormText>
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
            onChange={(dt) => setDateTime(dt)}
            customInput={<InputBox />}
            withPortal={size.width < 405}
            dateFormat="dd/MM/yy"
            todayButton="Today"
          />
        </InputGroup>
        <InputGroup>
          <IconClock />
          <DatePicker
            selected={dateTime}
            onChange={(dt) => setDateTime(dt)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            timeCaption="Time"
            dateFormat="h:mm aa"
            customInput={<InputBox />}
          />
        </InputGroup>
      </FlexRow>

      <SubmitButton addWeight={addWeight} weight={weight} dateTime={dateTime}>
        Submit weight
      </SubmitButton>
    </Wrapper>
  );
};

export default InputForm;
