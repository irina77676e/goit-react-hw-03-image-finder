import { Button, Div } from './Button.styled';

const ButtonLoad = ({ handleClickBtn }) => (
  <Div>
    <Button type="button" onClick={handleClickBtn}>
      Load more
    </Button>
  </Div>
);

export default ButtonLoad;
