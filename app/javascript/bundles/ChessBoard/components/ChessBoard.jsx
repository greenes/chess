import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames'

export default class ChessBoard extends React.Component {
  static propTypes = {
    turn: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class
    this.state = { 
        turn: this.props.turn,
        selectedPiece: null,
        activeSquare: null,
        rows: [8,7,6,5,4,3,2,1],
        columns: ['a','b','c','d','e','f','g','h'],
        piecePostions: {
            'a8': 'white-knight',
            'h8': 'white-knight',
            'a1': 'black-knight',
            'h1': 'black-knight',
            'a7': 'white-pawn',
            'b7': 'white-pawn',
            'c7': 'white-pawn',
            'd7': 'white-pawn',
            'e7': 'white-pawn',
            'f7': 'white-pawn',
            'g7': 'white-pawn',
            'h7': 'white-pawn',
            'a2': 'black-pawn',
            'b2': 'black-pawn',
            'c2': 'black-pawn',
            'd2': 'black-pawn',
            'e2': 'black-pawn',
            'f2': 'black-pawn',
            'g2': 'black-pawn',
            'h2': 'black-pawn',
        }
    };

    // This binding is necessary to make `this` work in the callback
    this.selectPiece = this.selectPiece.bind(this);
  }

  updateBoard = (turn) => {
    this.setState({ turn });
  };

  selectPiece = (e) =>{
    let newSelectedPiece = e.target.dataset["piece"]
    let newActiveSquare = e.target.dataset["square"]
    if (newSelectedPiece) {
        this.setState(state => ({
            selectedPiece: newSelectedPiece,
            activeSquare: newActiveSquare
        }));
    }
  }
  

  render() {
    const squares = []
    for (const [index, row] of this.state.rows.entries()) {
        for (const [i, column] of this.state.columns.entries()) {
            squares.push(
                <div className={ classNames({
                    'ChessBoard-square': true,
                    '--black': (row % 2) && ['a','c','e','g'].includes(column) || (!(row % 2) && ['b','d','f','h'].includes(column)),
                    '--white': (row % 2) && ['b','d','f','h'].includes(column) || !(row % 2) && ['a','c','e','g'].includes(column),
                    'selected' : this.state.activeSquare === column + row
                }) }  
                    onClick={this.selectPiece} 
                    data-square={column + row} 
                    data-piece={this.state.piecePostions[column + row]}
                    key={column + row}></div>
            )
        }
    }
    return (
        
      <div>
        <h3>
          Your turn, {this.state.turn}!
        </h3>
        <p>You selected the {this.state.selectedPiece} at {this.state.activeSquare}</p>
        <div className="ChessBoard">
            {squares}
        </div>
      </div>
    );
  }
}
