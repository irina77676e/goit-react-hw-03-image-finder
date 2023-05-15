import { Button } from './Button.styled';

const ButtonLoad = ({ handleClickBtn }) => (
  <div>
    <Button type="button" onClick={handleClickBtn}>
      Load more
    </Button>
  </div>
);

export default ButtonLoad;
