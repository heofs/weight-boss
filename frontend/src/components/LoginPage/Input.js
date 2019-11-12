import styled from 'styled-components';
import BaseInput from 'components/Inputs/BaseInput';

import { sizes } from 'constants/theme';

export default styled(BaseInput)`
  width: 100%;
  margin: 0.6em 0;
  font-size: ${sizes.textSize};
  line-height: 2em;
`;
