import { CheckBox, Icon } from "@rneui/themed";
import { COLOR } from "../../../assets/constant/color";
import { clickCheckProduct } from "../../../redux/checkShopCart";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const CheckBoxComponent = ({ post, sellerId }) => {
  const dispatch = useDispatch();
  const [isCheck, setIsCheck] = useState(post.product.isCheck);
  const user = useSelector((state) => state.auth?.user);
  const shopCart = useSelector((state) => state.shopCartContainer?.shopCart);
  const handelPress = () => {
    if (!post.product.isCheck) {
      setIsCheck(true);

      const product = {
        sellerId: sellerId,
        postId: post.postId,
        productId: post.product.productId,
        currentPrice: post.product.price,
        quantity: post.product.quantityInShopcart,
      };
      console.log(product);
      clickCheckProduct(shopCart, user.id, product, dispatch);
    }
  };

  return (
    <CheckBox
      checked={isCheck}
      iconType="material-community"
      checkedIcon="checkbox-marked"
      uncheckedIcon="checkbox-blank-outline"
      checkedColor={COLOR.mainColor}
      onPress={() => handelPress()}
      containerStyle={{ marginRight: 10, padding: 0 }}
    />
  );
};
export default CheckBoxComponent;
