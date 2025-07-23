import { useSelector } from "react-redux";
import { selectUser} from "../../redux/auth/selectors";

const UserAvatar = ({
  size = 35,
  fontSize = 16,
}) => {
  const user = useSelector(selectUser);
  const getInitial = (name) => name.trim()?.[0]?.toUpperCase() || "?";
  const initial = getInitial(user.name);


  const styles = {
    wrapper: {
      width: size,
      height: size,
      borderRadius: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-family)",
      fontSize: fontSize,
      fontWeight: "500",
      color: "#fff",
      backgroundColor: "#262626",
      border: "1px solid rgba(249, 249, 249, 0.2)",
      overflow: "hidden",
      textTransform: "uppercase",
    },
  };


  return (
    <div style={styles.wrapper}>
      {initial}
    </div>
  );
};

export default UserAvatar;
