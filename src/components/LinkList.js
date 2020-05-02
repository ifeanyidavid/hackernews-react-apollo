import React from "react";
import Link from "./Link";
import gql from "graphql-tag";
import { Query } from "react-apollo";

export default function LinkList() {
  const FEED_QUERY = gql`
    {
      feed {
        links {
          id
          description
          createdAt
          url
        }
      }
    }
  `;
  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;
        const linksToRender = data.feed.links;
        return linksToRender.map((link) => <Link key={link.id} link={link} />);
      }}
    </Query>
  );
}
