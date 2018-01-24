import React from 'react';

class RandomTweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fluTweet: {}
    };
    this.getFluTweet = this.getFluTweet.bind(this);
  }

  getFluTweet() {
    fetch('/api/v1/tweets', {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ fluTweet: body})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getFluTweet();
  }

  render() {
    let userName = this.state.fluTweet.user_name;
    let tweet = this.state.fluTweet.tweet_text;


    return(
      <div className='center'>
        <div className='card bg-light mb-3' style={{maxWidth: 18 + 'em'}}>
          <div className='card-header text-center'>Flu Tweet
            <i className="fa fa-frown-o fa-fw" aria-hidden="true"></i>
          </div>
          <div className='card-body'>
            <h5 className='card-title'>{`@${userName}`}</h5>
            <p className='card-text'>{tweet}</p>
          </div>
        </div>

        <button onClick={this.getFluTweet} type='button' className='btn btn-outline-secondary'>
          Get New Flu Tweet
          <i className="fa fa-twitter fa-fw" aria-hidden="true"></i>
        </button>
      </div>
    );
  }
};

export default RandomTweet;
