import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { FEED_QUERY } from "./LinkList";

export const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

export default class CreateLink extends Component {
  state = {
    description: "",
    url: "",
  };
  render() {
    const { description, url } = this.state;

    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            type="text"
            className="mb2"
            value={description}
            onChange={(e) => this.setState({ description: e.target.value })}
            placeholder="A description for the link"
          />
          <input
            type="text"
            className="mb2"
            value={url}
            onChange={(e) => this.setState({ url: e.target.value })}
            placeholder="The URL for the link"
          />
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ description, url }}
          onCompleted={() => this.props.history.push("/")}
          update={(store, { data: { post } }) => {
            const data = store.readQuery({ query: FEED_QUERY });
            data.feed.links.unshift(post);
            store.writeQuery({
              query: FEED_QUERY,
              data,
            });
          }}
        >
          {(postMutation) => (
            <button
              className="f6 link dim br3 ph3 pv2 mb2 dib white bg-black"
              onClick={postMutation}
            >
              Submit
            </button>
          )}
        </Mutation>
      </div>
    );
  }
}
