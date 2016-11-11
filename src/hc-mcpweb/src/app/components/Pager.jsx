import { default as React, Component } from 'react';
import {
  Button,
  Glyphicon
} from 'react-bootstrap';
import 'css/components/Pager';

const backIcon = <Glyphicon glyph='triangle-left' />;
const nextIcon = <Glyphicon glyph='triangle-right' />;
const homeIcon = <Glyphicon glyph='home' />;
const favoriteIcon = <Glyphicon glyph='heart' />;
const unFavoriteIcon = <Glyphicon glyph='remove-sign' />;

export default class Pager extends Component {
  render() {
    return (
      <div className='pager-style'>
        {this.props.onBack && (<Button onClick={this.props.onBack}>{backIcon}&nbsp;Back</Button>)}
        {this.props.onNext && (<Button onClick={this.props.onNext}>{nextIcon}&nbsp;Next</Button>)}
        {this.props.onHome && (<Button onClick={this.props.onHome}>{homeIcon}&nbsp;Home</Button>)}
        {this.props.onFavorite && (<Button onClick={this.props.onFavorite}>{favoriteIcon}&nbsp;Add to Favorites</Button>)}
        {this.props.onUnFavorite && (<Button onClick={this.props.onUnFavorite}>{unFavoriteIcon}&nbsp;Remove from Favorites</Button>)}
      </div>
    );
  }
}

Pager.propTypes = {
  onBack: React.PropTypes.func,
  onNext: React.PropTypes.func,
  onHome: React.PropTypes.func,
  onFavorite: React.PropTypes.func,
  onUnFavorite: React.PropTypes.func
};
