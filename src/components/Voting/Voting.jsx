import { Component } from 'react'
import SmileCard from '../SmileCard/SmileCard';
import './Voting.css';

export default class Voting extends Component {
  state = {
    candidates: [],
    modalOpen: false,
    winner: null
  };

  componentDidMount() {
    const urls = [
      'https://nikitayanakiev.github.io/homework_33/data.json',
      'http://localhost:3000/homework_33/data.json'
    ];
  
    urls.forEach(url => {
      fetch(url)
        .then(response => response.json())
        .then(result => {
          const myCandidates = result.map(candidate => ({
            ...candidate,
            counter: 0,
          }));
          this.setState({ candidates: myCandidates });
        });
    });
  }
  

  changeCounter = (id) => {
    this.setState(state => {
      const candidateIndex = state.candidates.findIndex(candidate => candidate.id === id);
      state.candidates[candidateIndex].counter++;
      return state;
    });
  }

  openModal = () => {
    const winner = this.ShowResults(this.state);
    this.setState({ modalOpen: true, winner: winner });
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  ShowResults(state) {
    const winner = state.candidates.reduce((prev, cur) => {
      if (prev.counter > cur.counter) {
        return prev
      }
      return cur
    });
    console.log(winner);
    return winner;
  }

  render() {
    const { modalOpen, winner } = this.state;

    return (
      <div>
        <p className='title'>Hello world. Here is our voting:</p>
        {!this.state.candidates.length && (<div>No candidates available</div>)}
        {!!this.state.candidates.length && (
          <div className='container'>
            {this.state.candidates.map(candidate => (
              <SmileCard
                id={candidate.id}
                name={candidate.name}
                key={candidate.id}
                counter={candidate.counter}
                votingAction={this.changeCounter}
              />
            ))}
          </div>
        )}

        <input className='btn_result' type="button" value="Show Results" onClick={this.openModal} />

        {modalOpen && (
          <div className="overlay">
            <div className="modal">
              <span className="close" onClick={this.closeModal}>x</span>
              {winner && winner.counter > 0 ? (
                <div className="modal-content">
                  <h2>Winner</h2>
                  <p>
                    <span className='winner__name'>{winner.name}</span> with 
                    <span className='winner__counter'> {winner.counter}</span> votes
                  </p>
                </div>
              ) : (
                <p>
                  No winner
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}
