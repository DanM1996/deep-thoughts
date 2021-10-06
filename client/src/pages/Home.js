import React from 'react';
// allows us to make requests to the GraphQL server
import { useQuery } from '@apollo/client';
// imports the query created in utils
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';

const Home = () => {
  // use useQuery hook to make query request, loading performs while the data is still being retreived, data runs once the request is complete
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // optional chaining (only works in browsers): if data exists, store it in thoughts variable, if its undefined save an empty array to the thoughts variable
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
