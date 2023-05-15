import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div style={{ textContent: 'center' }}>
      <ThreeDots
        height="120"
        width="120"
        radius="12"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
