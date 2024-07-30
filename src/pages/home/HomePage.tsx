import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication.hook";

function HomePage() {
  const { authenticated } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated === false) {
      navigate("/");
    }
  }, [authenticated]);

  return (
    <div>
      teste
    </div>
  );
}

export default HomePage;
