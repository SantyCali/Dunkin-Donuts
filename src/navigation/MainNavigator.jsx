// src/navigation/MainNavigator.jsx
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./auth/AuthStackNavigator";
import AppDrawerNavigator from "./drawer/AppDrawerNavigator";
import { useSelector, useDispatch } from "react-redux";
import { useGetProfilePictureQuery } from "../services/profileApi";
import { setImage, setLocalId, setUserEmail } from "../store/slices/userSlice";
import { useEffect, useState } from "react";
import { initSessionTable, getSession } from "../db";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../global/colors";

const MainNavigator = () => {
  const email = useSelector((s) => s.userReducer.email);
  const localId = useSelector((s) => s.userReducer.localId);
  const [checkingSession, setCheckingSession] = useState(true);
  const dispatch = useDispatch();

  const { data: profilePicture } = useGetProfilePictureQuery(localId, { skip: !localId });

  useEffect(() => {
    const bootstrap = async () => {
      try {
        await initSessionTable();
        const session = await getSession();
        if (session) {
          console.log("Session:", session);
          dispatch(setUserEmail(session.email));
          dispatch(setLocalId(session.localId));
        }
      } catch (e) {
        console.log("init/getSession error:", e);
      } finally {
        setCheckingSession(false);
      }
    };
    bootstrap();
  }, [dispatch]);

  useEffect(() => {
    if (profilePicture?.image) dispatch(setImage(profilePicture.image));
  }, [profilePicture, dispatch]);

  if (checkingSession) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.orange} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {email ? <AppDrawerNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;
