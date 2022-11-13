import { connect } from "react-redux";
import { actions } from "../../../Redux/profile-reducer";
import { AppStateType } from "../../../Redux/redux-store";
import MyPosts from "./MyPosts";

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  };
};

const MyPostsContainer = connect(mapStateToProps, { addPost: actions.addPost })(
  MyPosts
);

export default MyPostsContainer;
