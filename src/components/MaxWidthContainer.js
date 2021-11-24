import styled from 'styled-components';
import { respondTo } from '../utils/StyleUtil';

const MaxWidthContainer = styled.div`
    padding: 0 2rem;

    ${respondTo('tablet')`
        margin-left: auto;
        margin-right: auto;
        max-width: 1300px;
        width: 100%;
    `}
`;

export default MaxWidthContainer;
