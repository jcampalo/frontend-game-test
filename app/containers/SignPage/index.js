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
import A from 'components/A';
import LoadingIndicator from 'components/LoadingIndicator';
import Form from 'components/Form';
import SubmitButton from './SubmitButton';
import CenteredSection from './CenteredSection';
import LoadingWrapper from './LoadingWrapper';
import messages from './messages';
import { key } from './constants';
import { sign, change } from './actions';
import { selectUsername, selectPassword, selectLoading, selectError } from './selectors';
import reducer from './reducer';
import epic from './epic';

export class SignPage extends PureComponent {
  renderLoading() {
    const { loading } = this.props;

    if (loading) {
      return (
        <LoadingWrapper>
          <LoadingIndicator />
        </LoadingWrapper>
      );
    }

    return null;
  }

  renderError() {
    const { error } = this.props;

    if (error.id) {
      return (
        <Alert>
          <FormattedMessage {...error} />
        </Alert>
      );
    }

    return null;
  }

  render() {
    const { username, password, onChange, onSubmit } = this.props;
    const isInvalid = !(username.length && password.length);

    return (
      <article>
        <Helmet>
          <title>Sign Page</title>
          <meta name="description" content="Sign Page" />
        </Helmet>
        <div>
          <CenteredSection>
            <H3>
              <FormattedMessage {...messages.header} />
            </H3>
          </CenteredSection>
          <Form onSubmit={onSubmit}>
            {this.renderLoading()}
            <FormattedMessage {...messages.placeholderUsername}>
              {placeholder => (
                <Input
                  name="username"
                  type="text"
                  placeholder={placeholder}
                  value={username}
                  onChange={onChange}
                />
              )}
            </FormattedMessage>
            <FormattedMessage {...messages.placeholderPassword}>
              {placeholder => (
                <Input
                  name="password"
                  type="password"
                  placeholder={placeholder}
                  value={password}
                  onChange={onChange}
                />
              )}
            </FormattedMessage>
            <SubmitButton disabled={isInvalid}>
              <FormattedMessage {...messages.sign} />
            </SubmitButton>
            <A to="/login">
              <FormattedMessage {...messages.login} />
            </A>
            {this.renderError()}
          </Form>
        </div>
      </article>
    );
  }
}

SignPage.propTypes = {
  loading: PropTypes.bool,
  username: PropTypes.string,
  password: PropTypes.string,
  error: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export const mapDispatchToProps = dispatch => ({
  onChange: (value, name) => dispatch(change({ value, name })),
  onSubmit: evt => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(sign());
  }
});

const mapStateToProps = createStructuredSelector({
  username: selectUsername(),
  password: selectPassword(),
  loading: selectLoading(),
  error: selectError()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key, reducer });
const withEpic = injectEpic({ key, epic });

export default compose(
  withReducer,
  withConnect,
  withEpic
)(SignPage);
