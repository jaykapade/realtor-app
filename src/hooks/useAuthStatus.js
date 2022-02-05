import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkInStatus, setCheckInStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) setLoggedIn(true);
      setCheckInStatus(false);
    });
  }, []);

  return { loggedIn, checkInStatus };
};

export default useAuthStatus;
