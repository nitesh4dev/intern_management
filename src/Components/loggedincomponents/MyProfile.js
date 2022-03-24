import React, { useEffect, useState } from "react";
import LoadingScreen from "../../common/LoadingScreen";
export default function MyProfile() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);
  if (loading) return <LoadingScreen />;
  return <div>My Profile</div>;
}
