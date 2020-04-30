import React, { Component } from "react";
import { observable, action } from "mobx";
import { inject, observer } from "mobx-react";

const HN_BASE_URL = "http://hn.algolia.com/api/v1/search?query=";

const fetchStories = (query) => {
  return fetch(HN_BASE_URL + query).then((response) => response.json());
};

@inject("storyStore")
@observer
class SearchStories extends Component {
  @observable query = "";
  constructor(props) {
    super(props);
    // this.state = {
    //   query: "",
    // };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  @action onSubmit(event) {
    event.preventDefault();
    // const { query } = this.state;
    if (this.query) {
      fetchStories(this.query)
        .then((result) => this.props.storyStore.setStories(result.hits))
        .catch((error) => this.props.storyStore.setError(error));
      // this.setState(() => ({ query: "" }));
      this.query = "";
    }
  }

  @action onChange(event) {
    const { value } = event.target;
    // this.setState(() => ({ query: value }));
    this.query = value;
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" value={this.query} onChange={this.onChange} />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchStories;
