import validator from 'validate.js';
import i18n from "./../helpers/i18n";

const paOnAuthorizationRequestValidator = (challenge) => {
  if (validator.isEmpty(challenge)) {
    throw new Error(i18n('error_api_challenge_required'));
  }

  const authorizationUrl = challenge.authorizationUrl;
  if (validator.isEmpty(authorizationUrl)) {
    throw new Error(i18n('error_auth_url_required'));
  } else {
    if (!validator.isString(authorizationUrl)) {
      throw new Error(i18n('error_auth_url_must_be_string'));
    }
  }
};

export default paOnAuthorizationRequestValidator;