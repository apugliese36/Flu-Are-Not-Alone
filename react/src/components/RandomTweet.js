import React from 'react';

class RandomTweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fluTweet: {},
      location: ''
    };
    this.getFluTweet = this.getFluTweet.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  getLocation(fluTweet) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${fluTweet.latitude},${fluTweet.longitude}&key=AIzaSyDIpc3AFTpc8zxGA4s1_SLR1TsVuuJ6LzI`)
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
      let city, state, country, iso_code
      for (var ac = 0; ac < body.results[0].address_components.length; ac++) {
          var component = body.results[0].address_components[ac];

          switch(component.types[0]) {
              case 'locality':
                  city = component.long_name;
                  break;
              case 'administrative_area_level_1':
                  state = component.short_name;
                  break;
              case 'country':
                  country = component.long_name;
                  iso_code = component.short_name;
                  break;
          }
      };

      this.setState({ fluTweet: fluTweet, location: `${city}, ${state}`  })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
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
      this.getLocation(body)
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
            <p className='location'>{this.state.location}</p>
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
