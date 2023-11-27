import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("token_key");
    navigate("/");
  };

  return (
    <>
      <div style={{ minHeight: 800, marginTop: 20 }}>
        <h1>Profile Page</h1>

        <div>
          <button type="button" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}