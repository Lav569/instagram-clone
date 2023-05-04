import React from "react";
import "./Modal.css";
import { useNavigate } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';
export default function Modal({ setModalOpen }) {
  const navigate = useNavigate();
  return (
    <div className="darkBg" onClick={() => setModalOpen(false)}>
      <div className="centered_modal">
        <div className="logout_modal">
          {/* modal header */}
          <div className="logout_modal_Header">
            <h5 className="logout_modal_heading">Confirm</h5>
          </div>
          <button className="close_modal" onClick={() => setModalOpen(false)}>
                <CancelIcon />
          </button>
          {/* modal content */}
          <div className="logout_modal_Content">Are you really want to log Out ?</div>
          <div className="logout_modal_Actions">
            <div className="logout_actions_Container">
              <button
                className="logOutBtn"
                onClick={() => {
                  setModalOpen(false);
                  localStorage.clear();
                  navigate("../");
                }}
              >
                Log Out
              </button>

              <button className="cancel_logout_Btn" onClick={() => setModalOpen(false)}>
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}