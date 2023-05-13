import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    page: 1,
    status: 'idle',
    query: [],
    error: null,
  };

  handleSubmitInput = newQuery => {
    if (newQuery === this.state.name) {
      return;
    }
    this.setState({ name: newQuery, page: 1, status: 'pending' });
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
        </div>
      );
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    // if (status === 'resolved') {
    //   return (

    //   )
    // }
  }
}
