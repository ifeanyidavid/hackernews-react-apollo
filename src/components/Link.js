import React from "react";
import { gql } from "apollo-boost";
import { AUTH_TOKEN } from "../constants";
import { timeDifferenceForDate } from "../utils";
import { Mutation } from "react-apollo";

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;
export default function Link({ index, link, updateStoreAfterVote }) {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <Mutation
            mutation={VOTE_MUTATION}
            variables={{ linkId: link.id }}
            update={(store, { data: { vote } }) =>
              updateStoreAfterVote(store, vote, link.id)
            }
            onError={(error) => console.log(error.message)}
          >
            {(voteMuation) => (
              <div className="ml1 gray f11 pointer" onClick={voteMuation}>
                ▲
              </div>
            )}
          </Mutation>
        )}
        <div className="ml1">
          <div>
            {link.description} (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline gray f6"
            >
              {link.url}
            </a>
            )
          </div>
          <div className="f6 lh-copy gray">
            {link.votes.length} votes | by{" "}
            {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
