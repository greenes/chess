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
        possiblePositions: [],
        piecePostions: {
            'e8': 'black-queen',
            'd8': 'black-king',
            'e1': 'white-queen',
            'd1': 'white-king',
            'b8': 'black-knight',
            'g8': 'black-knight',
            'a8': 'black-rook',
            'h8': 'black-rook',
            'a1': 'white-rook',
            'h1': 'white-rook',
            'b1': 'white-knight',
            'g1': 'white-knight',
            'c1': 'white-bishop',
            'f1': 'white-bishop',
            'c8': 'black-bishop',
            'f8': 'black-bishop',
            'a7': 'black-pawn',
            'b7': 'black-pawn',
            'c7': 'black-pawn',
            'd7': 'black-pawn',
            'e7': 'black-pawn',
            'f7': 'black-pawn',
            'g7': 'black-pawn',
            'h7': 'black-pawn',
            'a2': 'white-pawn',
            'b2': 'white-pawn',
            'c2': 'white-pawn',
            'd2': 'white-pawn',
            'e2': 'white-pawn',
            'f2': 'white-pawn',
            'g2': 'white-pawn',
            'h2': 'white-pawn',
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
    let squareNum = parseInt(newActiveSquare.charAt(1));
    let squareLetter = newActiveSquare.charAt(0);
    let newPossiblePositions = []
    
    if (newSelectedPiece && newSelectedPiece.includes('white')) {
        newPossiblePositions.push((squareNum + 1).toString() + squareLetter)
        newPossiblePositions.push((squareNum + 2).toString() + squareLetter)
    } else if (newSelectedPiece) {
        newPossiblePositions.push((squareNum - 1).toString() + squareLetter)
        newPossiblePositions.push((squareNum - 2).toString() + squareLetter)
    }

    if (newSelectedPiece) {
        this.setState(state => ({
            selectedPiece: newSelectedPiece,
            activeSquare: newActiveSquare,
            possiblePositions: newPossiblePositions
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
        <p>You can move to {this.state.possiblePositions.join(' or ')}</p>
        <div className="ChessBoard">
            {squares}
        </div>
      </div>
    );
  }
}
