import { Box, useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "scenes/navbar";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import UserWidget from "scenes/widgets/UserWidget";
import LoadingBar from "react-top-loading-bar";
import { setProgress } from "state";
import PostsWidget from "scenes/widgets/PostsWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import ActiveUsersWidget from "scenes/widgets/ActiveUsersWidget";
import '../../App.css'
import { useEffect } from "react";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const progress = useSelector(s=>s.progress);

  useEffect(()=>{
    dispatch(setProgress(0)); 
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <LoadingBar
        color="#e20057"
        height={2}
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
        className="loading-div"
      />
      <Navbar />
      <Box
        width="100%"
        padding="0.5rem 3%"
        display={isNonMobileScreens ? "flex" : "block"}
        justifyContent="space-between"
        gap="0.3rem"
      >
        <Box flexBasis={"26%"}>
          <UserWidget user_id={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "1.5rem"}
          gap={"1rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id}/>
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="30%">
            <ActiveUsersWidget/>
            <FriendListWidget/>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
