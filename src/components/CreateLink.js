import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

export default class CreateLink extends Component {
  state = {
    description: "",
    url: "",
  };
  render() {
    const { description, url } = this.state;
    const POST_MUTATION = gql`
      mutation PostMutation($description: String!, $url: String!) {
        post(description: $description, url: $url) {
          id
          createdAt
          url
          description
        }
      }
    `;

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
