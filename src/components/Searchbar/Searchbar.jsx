import { Component } from 'react';
import { toast } from 'react-toastify';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    value: '',
  };

  handleInputChange = event => {
    this.setState({ value: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.value.trim() === '') {
      return toast.error('Enter data in the search field!');
    }
    this.props.onSubmit(this.state.value.trim().toLowerCase());
    this.setState({ value: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit"></SearchFormButton>

          <SearchFormInput
            class="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
            value={this.state.value}
          />
        </SearchForm>
      </Header>
    );
  }
}
