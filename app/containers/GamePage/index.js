import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectEpic from 'utils/injectEpic';
import Input from 'components/Input/Form';
import Alert from 'components/Alert';
import H3 from 'components/H3';
import Form from 'components/Form';
import LoadingIndicator from 'components/LoadingIndicator';
import { selectCurrentUser } from 'containers/App/selectors';
import SubmitButton from './SubmitButton';
import CenteredSection from './CenteredSection';
import messages from './messages';
import { key } from './constants';
import { save, change } from './actions';
import { selectNumber, selectAttempts, selectSuccess } from './selectors';
import reducer from './reducer';
import epic from './epic';

export class GamePage extends PureComponent {
  renderLoading() {
    const { loading } = this.props;

    if (loading) {
      return (
        <LoadingIndicator />
      );
    }

    return null;
  }

  renderError() {
    const { success, attempts } = this.props;

    if (success) {
      return (
        <Alert>
          <FormattedMessage {...messages.success} />
        </Alert>
      );
    }

    return (
      <Alert>
        <FormattedMessage {...messages.attempts} values={{ attempts: `${attempts}` }} />
      </Alert>
    );
  }

  render() {
    const { number, onChange, onSubmit } = this.props;
    const isInvalid = !(number);

    return (
      <article>
        <Helmet>
          <title>Game Page</title>
          <meta name="description" content="Game Page" />
        </Helmet>
        <div>
          <CenteredSection>
            <H3>
              <FormattedMessage {...messages.header} />
            </H3>
          </CenteredSection>
          <Form onSubmit={onSubmit}>
            <FormattedMessage {...messages.placeholderNumber}>
              {placeholder => (
                <Input
                  name="number"
                  type="number"
                  min="0"
                  max="100"
                  placeholder={placeholder}
                  value={number}
                  onChange={onChange}
                />
              )}
            </FormattedMessage>
            <SubmitButton disabled={isInvalid}>
              <FormattedMessage {...messages.save} />
            </SubmitButton>
            {this.renderError()}
          </Form>
        </div>
      </article>
    );
  }
}

GamePage.propTypes = {
  loading: PropTypes.bool,
  number: PropTypes.string,
  attempts: PropTypes.number,
  success: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export const mapDispatchToProps = dispatch => ({
  onChange: (value, name) => dispatch(change({ value, name })),
  onSubmit: evt => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(save());
  }
});

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser(),
  attempts: selectAttempts(),
  number: selectNumber(),
  success: selectSuccess()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key, reducer });
const withEpic = injectEpic({ key, epic });

export default compose(
  withReducer,
  withConnect,
  withEpic
)(GamePage);
