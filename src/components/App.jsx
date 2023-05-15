import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import pixabayApi from './Api';
import ButtonLoad from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    page: 1,
    name: '',
    status: 'idle',
    query: [],
    error: null,
    showModal: false,
    modalImg: '',
    modalAlt: '',
    btnActivate: true,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.name;
    const nextQuery = this.state.name;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (nextPage > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }

    if (prevQuery !== nextQuery) {
      this.setState({ query: [], status: 'pending' });
    }

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      pixabayApi
        .fetchQuery(nextQuery, nextPage)
        .then(({ hits }) => {
          const images = hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return { id, webformatURL, largeImageURL, tags };
            }
          );

          if (images.length > 0) {
            this.setState(prevState => {
              return {
                query: [...prevState.query, ...images],
                status: 'resolved',
                btnActivate: true,
              };
            });

            if (images.length > 0 && images.length < 12) {
              this.setState({ btnActivate: false });
            }
          } else {
            alert(`No results found for ${nextQuery}.`).this.setState({
              status: 'idle',
            });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleSubmitInput = newQuery => {
    if (newQuery === this.state.name) {
      return;
    }
    this.setState({ name: newQuery, page: 1, status: 'pending' });
  };

  handleClickBtn = () => {
    this.setState(({ page }) => {
      return { page: page + 1, status: 'pending' };
    });
  };

  handleClickImg = event => {
    const imgForModal = event.target.dataset.src;
    const altForModal = event.target.alt;
    this.setState({
      showModal: true,
      modalImg: imgForModal,
      modalAlt: altForModal,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { query, showModal, modalImg, modalAlt, error, status, btnActivate } =
      this.state;

    if (status === 'idle') {
      return (
        <div>
          <Searchbar onSubmit={this.handleSubmitInput} />
          <ImageGallery query={this.state.query} />

          <ToastContainer
            position="top-right"
            autoClose={1500}
            limit={1}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div>
          <Searchbar onSubmit={this.handleSubmitInput} />
          {query.length > 0 && <ImageGallery query={query} />}
          <Loader />
        </div>
      );
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img
                style={{ borderRadius: '8px' }}
                src={modalImg}
                alt={modalAlt}
              />
            </Modal>
          )}
          <div>
            <Searchbar onSubmit={this.handleSubmitInput} />
            <ImageGallery onClickImg={this.handleClickImg} query={query} />

            {btnActivate && <ButtonLoad handleClickBtn={this.handleClickBtn} />}
          </div>
        </>
      );
    }
  }
}
