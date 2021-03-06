import styled from 'styled-components';
import { colors, sizes } from 'constants/theme';

const Table = styled.table`
  width: 100%;
  margin: 4em 0 0;
  border-spacing: 0;
  color: ${colors.dark};
  font-weight: 500;

  tr {
    background: ${colors.secondary};
    :nth-child(even) {
      background: ${colors.darkSecondary};
    }
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }

  th {
    background: ${colors.primary};
    text-align: center;
    vertical-align: middle;
    padding: 0.3em;
    height: 2em;
    :first-child {
      border-radius: ${sizes.cornerRadius} 0px 0px 0px;
    }
    :last-child {
      border-radius: 0px ${sizes.cornerRadius} 0px 0px;
    }
  }

  thead {
    tr:first-child {
      background: none;
    }
  }

  tbody {
    tr:last-child {
      td {
        :first-child {
          border-radius: 0px 0px 0px ${sizes.cornerRadius};
        }
        :last-child {
          border-radius: 0px 0px ${sizes.cornerRadius} 0px;
        }
      }
    }
  }
`;

export default Table;
