import React from 'react';
import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    page: 1,
    status: 'pending',
  };

  handleSubmitInput = newQuery => {
    if (newQuery === this.state.name) {
      return;
    }
    this.setState({ name: newQuery, page: 1, status: 'pending' });
  };

  // componentDidUpdate(prevProps, prevState) {
  //   const prevImg = prevProps.
  // }
  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmitInput}>
          <ImageGallery query={this.state.query} />
          <button type="submit">
            <span class="material-icons">search</span>
          </button>
        </Searchbar>
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
        <div class="gallery-container">
          <div class="gallery"></div>
          <button type="button" class="btn-load-more is-hidden">
            Load more
          </button>
        </div>
      </div>
    );
  }
}
