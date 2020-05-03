import React, { Component } from "react";
import { withApollo } from "react-apollo";
import { gql } from "apollo-boost";
import Link from "./Link";

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

class Search extends Component {
  state = {
    links: [],
    filter: "",
    loading: false,
  };
  render() {
    const { links, loading } = this.state;
    return (
      <div>
        <div>
          Search
          <input
            type="text"
            onChange={(e) => this.setState({ filter: e.target.value })}
          />
          <button className="pointer button" onClick={() => this._executeSearch()}>OK</button>
        </div>
        {loading && <span>Fetching</span>}
        {links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
      </div>
    );
  }

  _executeSearch = async () => {
    const { filter } = this.state;
    this.setState({ loading: true });
    const result = await this.props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter },
    });
    const links = result.data.feed.links;
    this.setState({ links, loading: result.loading });
  };
}

export default withApollo(Search);
