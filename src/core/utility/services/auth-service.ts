import {
  UserManager,
  UserManagerSettings,
  WebStorageStateStore,
} from 'oidc-client';
import {
  acrValues,
  clientId,
  clientRoot,
  clientScope,
  setAuthority,
} from '../../../environments/environment';
import { setUser } from '../../../features/auth/auth';
import { store } from '../../../store/store';
import { useEffect, useState } from 'react';

const AuthService = () => {
  const [userManager, setUserManager] = useState(new UserManager({}));
  useEffect(() => {
    const settings: UserManagerSettings = {
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      authority: setAuthority,
      client_id: clientId,
      redirect_uri: clientRoot,
      response_type: 'id_token token',
      scope: clientScope,
      post_logout_redirect_uri: clientRoot,
      client_secret: 'secret1',
      acr_values: acrValues,
    };
    setUserManager(new UserManager(settings));
  }, []);

  const getUser = () => {
    return userManager.getUser();
  };

  const login = () => {
    userManager.signinRedirect().catch((error) => {
      console.error('Sign-in redirect error:', error);
    });
  };

  const afterLogin = async () => {
    const user = await userManager.signinRedirectCallback();
    store.dispatch(setUser(user.profile));
    localStorage.setItem('user', user.access_token);
    localStorage.setItem('role', user.profile.role);
    return user;
  };

  const renewToken = () => {
    return userManager.signinSilent();
  };

  const logout = () => {
    return userManager.signoutRedirect();
  };

  return {
    getUser,
    login,
    afterLogin,
    renewToken,
    logout,
  };
};

export default AuthService;
