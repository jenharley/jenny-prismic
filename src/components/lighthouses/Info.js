import { Typography } from "../Typography";
import styled from "styled-components";

const Description = styled(Typography)`
`;

const StyledInfo = styled.div`
    width: 325px;
`;

const Info = (props) => {
    const {info} = props;
    const { name, description } = info.properties;
  
    return (
      <StyledInfo>
        <div>
            <Typography variant="h1" component="h1">{name}</Typography>
            <img src={info.properties.image.url} alt="" />
        </div>
        <Description variant="bodyLarge">{description}</Description>
        <a target="_new" href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${name}`}>
            Learn more
        </a>
      </StyledInfo>
    );
}

export default Info;