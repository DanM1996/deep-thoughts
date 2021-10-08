import React from 'react';
// allows us to make requests to the GraphQL server
import { useQuery } from '@apollo/client';
// imports the query created in utils
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';
import Auth from '../utils/auth';
import FriendList from '../components/FriendList';

const Home = () => {
  // use useQuery hook to make query request, loading performs while the data is still being retreived, data runs once the request is complete
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // use object destructuring to extract 'data' from the 'useQuery' Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  // optional chaining (only works in browsers): if data exists, store it in thoughts variable, if its undefined save an empty array to the thoughts variable
  const thoughts = data?.thoughts || [];
  console.log(thoughts);
  const loggedIn = Auth.loggedIn();
  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
