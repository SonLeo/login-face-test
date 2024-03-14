import "./App.css";
import { IResolveParams, LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { User } from "./User";
import { useCallback, useState } from "react";

function App() {

  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState<any>();

  const onLoginStart = useCallback(() => {
    alert('login start');
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider('');
    alert('logout success');
  }, []);

  const onLogout = useCallback(() => {}, []);

  return (
    <>
      {provider && profile && (
        <User provider={provider} profile={profile} onLogOut={onLogout} />
      )}
      <div className={`App ${provider && profile ? 'hide' : ''}`}>

      </div>
      <LoginSocialFacebook
        appId="346569645047125"
        fieldsProfile={
          "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
        }
        onLoginStart={onLoginStart}
        onLogoutSuccess={onLogoutSuccess}
        redirect_uri={"/"}
        onResolve={({ provider, data }: IResolveParams) => {
          setProvider(provider);
          setProfile(data);
        }}
        onReject={err => {
          console.log(err);
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>
    </>
  );
}

export default App;
