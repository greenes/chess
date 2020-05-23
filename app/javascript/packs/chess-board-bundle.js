import ReactOnRails from 'react-on-rails';

import ChessBoard from '../bundles/ChessBoard/components/ChessBoard';

// This is how react_on_rails can see the ChessBoard in the browser.
ReactOnRails.register({
  ChessBoard,
});
