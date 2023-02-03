import validator from 'validate.js';
import i18n from "./../helpers/i18n";

const paOnAuthorizationSuccessValidator = (challenge) => {
  if (validator.isEmpty(challenge)) {
    throw new Error(i18n('error_api_challenge_required'));
  }

  const oidcAuthnResponseEndpoint = challenge.oidcAuthnResponseEndpoint;
  if (validator.isEmpty(oidcAuthnResponseEndpoint)) {
    throw new Error(i18n('error_oidc_auth_endpoint_required'));
  } else {
    if (!validator.isString(oidcAuthnResponseEndpoint)) {
      throw new Error(i18n('error_oidc_auth_endpoint_must_be_string'));
    }
  }

  const method = challenge.method;
  if (validator.isEmpty(method)) {
    throw new Error(i18n('error_methode_attribute_required'));
  } else {
    if (!validator.isString(method)) {
      throw new Error(i18n('error_methode_attribute_must_be_string'));
    }
  }
};

export default paOnAuthorizationSuccessValidator;