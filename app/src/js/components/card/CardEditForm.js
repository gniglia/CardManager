import React from 'react';
import Button from '../common/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cardActions from '../../actions/cardActions';
import Spinner from '../common/spinner/Spinner';

class CardEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: ''
    };
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }
  handleDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  isValidForm() {
    return this.state.title.length > 0 && this.state.description.length > 0;
  }

  saveForm() {
    this.props.createCard({
      title: this.state.title,
      description: this.state.description
    }).then(() => this.props.hideModal());
  }

  render () {
    const {saving} = this.props;

    return (
      <div>
        <form>
          <div className='form-group'>
            <label>Title</label>
            <input
              value={this.state.title}
              onChange={this.handleTitleChange.bind(this)}
              className='form-control'
              placeholder='Card title'
            />
          </div>
          <div className='form-group'>
            <label>Description</label>
            <textarea
              value={this.state.description}
              onChange={this.handleDescriptionChange.bind(this)}
              className='form-control'
              rows='3'
              placeholder='Card description'
            />
          </div>

          <Button
            text={saving ? 'Saving...' : 'Save'}
            disabled={saving || !this.isValidForm()}
            onClickHandler={(e) => {
              e.preventDefault();
              this.saveForm();
            }}
            className='btn btn-primary btn-sm' />
          {' '}
          <Button
            text='Cancel'
            onClickHandler={(e) => {
              e.preventDefault();
              this.props.hideModal();
            }}
            className='btn btn-primary btn-sm' />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    saving: state.cards.saving
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCard: bindActionCreators(cardActions.createCard, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardEditForm);
