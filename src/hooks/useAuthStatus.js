import { useEffect, useRef, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkInStatus, setCheckInStatus] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) setLoggedIn(true);
        setCheckInStatus(false);
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return { loggedIn, checkInStatus };
};

export default useAuthStatus;
