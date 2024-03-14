import { memo } from "react";

interface Props {
  profile: any;
  provider: string;
  onLogOut: () => void;
}

export const User = memo(({ provider, profile, onLogOut }: Props) => {
  const avatar =
    profile?.avatar ||
    profile.profile_image_url ||
    profile.avatar_url ||
    profile.picture ||
    profile.picture.data.url ||
    profile.profile_image_url_https ||
    "https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg";

  return (
    <div className="card">
      <div className="avt">
        <img src={avatar} alt="" />
      </div>

      <h3 className="provider">{provider.toUpperCase()}</h3>

      <div className="content">
        <div className="data">
            {Object.entries(profile).map(([key, value]: any) => (
                <div className="field" key={key}>
                    <div className="label">{key}: </div>
                    <div className="value">{JSON.stringify(value)}</div>
                </div>
            ))}
        </div>
        <button className="btn-logout" onClick={onLogOut}>Log out</button>
      </div>
    </div>
  );
});
