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
        capturedPieces: [],
        possibleMoves: [],
        piecePositions: {
					'd8': 'black-queen',
					'e8': 'black-king',
					'd1': 'white-queen',
					'e1': 'white-king',
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
    this.selectSquare = this.selectSquare.bind(this);
	}
	
	completeTurn = () => {
		this.setState(state => ({
			selectedPiece: null,
			activeSquare: null,
			possibleMoves: [],
			turn: (this.state.turn === 'white' ? 'black' : 'white'),
		}));
	}
	
	calculatePossibleMoves = (piece, square) => {
    let squareNum = parseInt(square.charAt(1));
		let squareLetter = square.charAt(0);
		let newPossibleMoves = [];
		const columns = this.state.columns;
		const rows = this.state.rows;

		if (piece == 'black-pawn') {
			// If one space forward is not occupied, add to possible moves
			if (!this.state.piecePositions[squareLetter + (squareNum - 1).toString()]) {
				newPossibleMoves.push(squareLetter + (squareNum - 1).toString());
			}

			// If the pawn has not moved, he can move 2 spaces if the space is not occupied
			if ((!this.state.piecePositions[squareLetter + (squareNum - 2).toString()]) && squareNum == 7) {
				newPossibleMoves.push(squareLetter + (squareNum - 2).toString());
			}

			// If opposing piece is in capturable space, add to possible moves
			if (this.state.piecePositions[columns[columns.indexOf(squareLetter) + 1] + (squareNum - 1).toString()]) {
				newPossibleMoves.push(columns[columns.indexOf(squareLetter) + 1] + (squareNum - 1).toString());
			}

			// If opposing piece is in capturable space, add to possible moves
			if (this.state.piecePositions[columns[columns.indexOf(squareLetter) - 1] + (squareNum - 1).toString()]) {
				newPossibleMoves.push(columns[columns.indexOf(squareLetter) - 1] + (squareNum - 1).toString());
			}
		} else if (piece == 'white-pawn') {
			// If one space forward is not occupied, add to possible moves
			if (!this.state.piecePositions[squareLetter + (squareNum + 1).toString()]) {
				newPossibleMoves.push(squareLetter + (squareNum + 1).toString());
			}

			// If the pawn has not moved, he can move 2 spaces if the space is not occupied
			if ((!this.state.piecePositions[squareLetter + (squareNum + 2).toString()]) && squareNum == 2) {
				newPossibleMoves.push(squareLetter + (squareNum + 2).toString());
			}

			// If opposing piece is in capturable space, add to possible moves
			if (this.state.piecePositions[columns[columns.indexOf(squareLetter) + 1] + (squareNum + 1).toString()]) {
				newPossibleMoves.push(columns[columns.indexOf(squareLetter) + 1] + (squareNum + 1).toString());
			}

			// If opposing piece is in capturable space, add to possible moves
			if (this.state.piecePositions[columns[columns.indexOf(squareLetter) - 1] + (squareNum + 1).toString()]) {
				newPossibleMoves.push(columns[columns.indexOf(squareLetter) - 1] + (squareNum + 1).toString());
			}
		} else if (piece.includes('rook')) {
			let leftHorizontalMoves = columns.slice(columns.indexOf(columns[columns.indexOf(squareLetter) + 1]));
			let rightHorizontalMoves = columns.slice(0, columns.indexOf(squareLetter)).reverse();
			
			// Check possible horizontal moves and add to possible moves until we find an occupied space
			for (const [index, column] of leftHorizontalMoves.entries()) {
				let horzMove = column + squareNum;
				if (!this.state.piecePositions[horzMove] || !this.state.piecePositions[horzMove].includes(this.state.turn)) {
					newPossibleMoves.push(horzMove);
				} else {
					break;
				}
			}
			for (const [index, column] of rightHorizontalMoves.entries()) {
				let horzMove = column + squareNum;
				if (!this.state.piecePositions[horzMove] || !this.state.piecePositions[horzMove].includes(this.state.turn)) {
					newPossibleMoves.push(horzMove);
				} else {
					break;
				}
			}

			// Check possible vetical moves and add to possible moves until we find an occupied space
			let forwardVerticalMoves = [1,2,3,4,5,6,7,8].slice(squareNum);
			let backwardVerticallMoves = rows.slice(rows.indexOf(squareNum) + 1);
			for (const [index, row] of forwardVerticalMoves.entries()) {
				let vertMove = squareLetter + row;
				if (!this.state.piecePositions[vertMove] || !this.state.piecePositions[vertMove].includes(this.state.turn)) {
					newPossibleMoves.push(vertMove);
				} else {
					break;
				}
			}
			for (const [index, row] of backwardVerticallMoves.entries()) {
				let vertMove = squareLetter + row;
				if (!this.state.piecePositions[vertMove] || !this.state.piecePositions[vertMove].includes(this.state.turn)) {
					newPossibleMoves.push(vertMove);
				} else {
					break;
				}
			}
		} else {
			for (const [index, row] of this.state.rows.entries()) {
				for (const [i, column] of this.state.columns.entries()) {
					let space = column + row;
					if (this.state.piecePositions[space] && !this.state.piecePositions[space].includes(this.state.turn)) {
						newPossibleMoves.push(column + row);
					} else {
						newPossibleMoves.push(column + row);
					}
				}
			}
		}

		this.setState(state => ({
			possibleMoves: newPossibleMoves.flat(),
		}));
	}

  selectSquare = (e) =>{
    let newSelectedPiece = e.target.dataset["piece"];
		let newActiveSquare = e.target.dataset["square"];
		
    if (newSelectedPiece) {
    // If the selected square contatins a piece

			if (newSelectedPiece.includes(this.state.turn)) {
				// If the piece belongs to current player, it can be selected
				this.setState(state => ({
						selectedPiece: newSelectedPiece,
						activeSquare: newActiveSquare,
				}));
				// Calculate the possible moves for this piece
				this.calculatePossibleMoves(newSelectedPiece, newActiveSquare);
			} else if (this.state.selectedPiece && this.state.possibleMoves.includes(newActiveSquare)) {
				// If the piece in the square belongs to the opposing player 
				// and a piece has been selected
				// and the square is in the list of possible positions
				this.setState(prevState => {
						const { piecePositions } = prevState;
					
						piecePositions[newActiveSquare] = this.state.selectedPiece;
						delete piecePositions[this.state.activeSquare];
						
						return { piecePositions };
					});

				this.setState(prevState => {
					const { capturedPieces } = prevState;
					
					capturedPieces.push(newSelectedPiece);
					
					return { capturedPieces };
				});
				this.completeTurn();
			}
    } else if (this.state.possibleMoves.includes(newActiveSquare)) {
    	// If the selected square is empty
			// and the square is in the list of possible moves
			this.setState(prevState => {
				const { piecePositions } = prevState;
			
				piecePositions[newActiveSquare] = this.state.selectedPiece;
				delete piecePositions[this.state.activeSquare];
				
				return { piecePositions };
			});
			this.completeTurn();
			
		}
	}

  render() {
    const squares = []
    const captureWhitePieces = []
		const captureBlackPieces = []
		
    for (const [index, row] of this.state.rows.entries()) {
			for (const [i, column] of this.state.columns.entries()) {
				squares.push(
					<div className={ classNames({
						'ChessBoard-square': true,
						'ChessBoard-piece': true,
						'--black': (row % 2) && ['a','c','e','g'].includes(column) || (!(row % 2) && ['b','d','f','h'].includes(column)),
						'--white': (row % 2) && ['b','d','f','h'].includes(column) || !(row % 2) && ['a','c','e','g'].includes(column),
						'selected' : this.state.activeSquare === column + row
					}) }  
						onClick={this.selectSquare} 
						data-square={column + row} 
						data-piece={this.state.piecePositions[column + row]}
						key={column + row}></div>
			)
			}
		}
		
		for (const [index, piece] of this.state.capturedPieces.entries()) {
			if (piece.includes('white')) {
				captureWhitePieces.push(
					<li className="ChessBoard-piece ChessBoard-capturedPiece"
							data-piece={piece}
							key={piece + index}></li>
				)
			} else {
				captureBlackPieces.push(
					<li className="ChessBoard-piece ChessBoard-capturedPiece"
							data-piece={piece}
							key={piece + index}></li>
				)
			}
		}

		let selectionNotice = ""
		if (this.state.selectedPiece) {
			selectionNotice = 'You selected the ' + this.state.selectedPiece + ' at ' + this.state.activeSquare;
		} else {
			selectionNotice = 'Select a piece!';
		}
		
    return (
      <div>
        <h3 className="ChessBoard-info">
          Your turn, {this.state.turn}! {selectionNotice}
        </h3>
        <div className="ChessBoard">
            {squares}
        </div>
				<div className="ChessBoard-capturedPiece-wrap">
					<ul>
						{captureBlackPieces}
					</ul>
					<ul>
						{captureWhitePieces}
					</ul>
				</div>
      </div>
    );
  }
}
