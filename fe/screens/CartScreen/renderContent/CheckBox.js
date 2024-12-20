import { CheckBox, Icon } from "@rneui/themed";
import { COLOR } from "../../../assets/constant/color";
import {
  clickCheckProduct,
  UnClickCheckProduct,
} from "../../../redux/checkShopCart";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getSum } from "../../../redux/shopCartSlice";

const CheckBoxComponent = ({ post, isCheck, sellerId }) => {
  const dispatch = useDispatch();
  const [isCheckState, setIsCheck] = useState(isCheck);
  const user = useSelector((state) => state.auth?.user);
  const shopCart = useSelector((state) => state.shopCartContainer?.shopCart);
  const isCheckingAll = useSelector(
    (state) => state.shopCartContainer?.isCheckingAll
  );

  const handelPress = () => {
    if (post.postId === null || post.product.productId === null) return;

    if (!isCheckState) {
      setIsCheck(true);

      const product = {
        sellerId: sellerId,
        postId: post.postId,
        productId: post.product.productId,
        currentPrice: post.product.price,
        quantity: post.product.quantityInShopcart,
      };
      clickCheckProduct(shopCart, user.id, product, dispatch);
    }

    if (isCheckState) {
      console.log("unclick");
      setIsCheck(false);
      const product = {
        sellerId: sellerId,
        postId: post.postId,
        productId: post.product.productId,
        currentPrice: post.product.price,
        quantity: post.product.quantityInShopcart,
      };
      UnClickCheckProduct(shopCart, user.id, product, dispatch);
    }
  };

  return (
    <CheckBox
      checked={isCheckingAll && post.postId != null ? true : isCheck}
      iconType="material-community"
      checkedIcon="checkbox-marked"
      uncheckedIcon="checkbox-blank-outline"
      checkedColor={COLOR.mainColor}
      onPress={() => handelPress()}
      containerStyle={{ padding: 0 }}
    />
  );
};
export default CheckBoxComponent;
