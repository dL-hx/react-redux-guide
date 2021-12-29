import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as modalActions from "./../../store/actions/modal.actions";

function Modal(props) {
  
  const styles = {
    width: 200,
    height: 200,
    position: "absolute",
    left: "50%",
    top: "50%",
    // marginLeft 等于,负的 自己盒子W的一半
    // -200/2 = -100
    marginLeft: -100,
    // marginTop 等于,负的 自己盒子H的一半
    // -200/2 = -100
    marginTop: -100,
    backgroundColor: "skyblue",
    display: props.vist ? "block" : "none",
  };

  return (
    <div>
      {/* <button onClick={()=>props.show()}>显示</button> */}
      <button onClick={()=>props.show_async()}>显示</button>
      <button onClick={()=>props.hide()}>隐藏</button>
      {/*  {
             props.show&&<div style={styles}></div>
        } */}
      <div style={styles}></div>
    </div>
  );
}

// export default Modal;
const mapStateToProps = (state) => {
  return {
    vist: state.modal.show,
  };
};

const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators(modalActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
