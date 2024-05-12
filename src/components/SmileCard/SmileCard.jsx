import { Component } from 'react'
import PropTypes from 'prop-types';
import './SmileCard.css';

export default class SmileCard extends Component {

  handleVote = () => {
    console.log('Voted.');
    this.props.votingAction(this.props.id);
  }

  render() {
    return (
      <div className='SmileCard'>
        <p>Smile {this.props.name}</p>
        <p>{this.props.counter}</p>
        <p>
          <input className='btn__vote' type="button" value="Vote" onClick={this.handleVote} />
        </p>
      </div>
    )
  }
}

SmileCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  counter: PropTypes.number,
  votingAction: PropTypes.func,
}