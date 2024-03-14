import React, { useEffect } from 'react';

interface FacebookLoginProps {
  appId: string;
  onLoginSuccess: (response: any) => void;
  onLoginFailure: (error: any) => void;
}

const FacebookLogin: React.FC<FacebookLoginProps> = ({
  appId,
  onLoginSuccess,
  onLoginFailure
}) => {
  useEffect(() => {
    // Load Facebook SDK asynchronously
    const loadFacebookSDK = () => {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId,
          cookie: true,
          xfbml: true,
          version: 'v10.0'
        });

        window.FB.AppEvents.logPageView();
      };

      (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    };

    loadFacebookSDK();
  }, [appId]);

  const handleLogin = () => {
    window.FB.login(
      function(response) {
        if (response.authResponse) {
          onLoginSuccess(response);
        } else {
          onLoginFailure(response);
        }
      },
      { scope: 'public_profile,email' }
    );
  };

  return (
    <button onClick={handleLogin}>
      Login with Facebook
    </button>
  );
};

export default FacebookLogin;
