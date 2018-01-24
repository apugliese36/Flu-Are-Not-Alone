import React from 'react';
import InfoCol from '../components/InfoCol';
import RandomTweet from '../components/RandomTweet';

const App = props => {
  return(
    <div className='container-fluid'>
      <div className='row'>
        <div className='jumbotron col-sm-4 align-self-center'>
          <InfoCol />
        </div>
        <div className='col-sm-8 align-self-center'>
          <RandomTweet />
        </div>
      </div>
    </div>
  );
};

export default App;
