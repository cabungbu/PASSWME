import React, { useRef, useMemo, useCallback, useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "./style";
import BannerSection from "./partials/bannerSection";
import CategorySection from "./partials/categorySection";
import ServicePostSection from "./partials/servicePostSection";
import { scaleHeight } from "../../assets/constant/responsive";
export default function Home() {
  // const navigation = useNavigation();
  // const user = useSelector((state) => state.auth.user);
  // const refreshTokenRedux = useSelector((state) => state.auth.refreshToken);
  // const accessToken = useSelector((state) => state.auth.accessToken);
  // const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <BannerSection />
      <CategorySection />
      <ServicePostSection />
    </View>
  );
}
