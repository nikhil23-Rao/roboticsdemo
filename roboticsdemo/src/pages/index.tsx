import { Inter } from "next/font/google";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Typography } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [value, setValue] = React.useState("1");
  const [members, setMembers] = useState<any[]>([]);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [teamOptions, _] = useState([
    "5776A",
    "5776E",
    "5776K",
    "5776T",
    "5776X",
  ]);
  const [gradeOptions, __] = useState(["9", "10", "11", "12"]);
  const [team, setTeam] = useState("5776A");
  const [grade, setGrade] = useState("9");
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    username: string;
    role: string;
    imageUrl: string;
    team: string;
    grade: string;
  }>();
  const [editUsername, setEditUsername] = useState(modalData?.username);
  const [editRole, setEditRole] = useState(modalData?.grade);
  const [editImageUrl, setEditImageUrl] = useState(modalData?.imageUrl);
  const [editTeam, setEditTeam] = useState(modalData?.team);
  const [editGrade, setEditGrade] = useState(modalData?.grade);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(members);
  }, [members]);

  useEffect(() => {
    setEditUsername(modalData?.username);
    setEditGrade(modalData?.grade);
    setEditRole(modalData?.role);
    setEditTeam(modalData?.team);
    setEditImageUrl(modalData?.imageUrl);
  }, [modalData]);

  return (
    <>
      <div className="container" style={{ flexDirection: "column" }}>
        <ToastContainer />

        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Add Members" value="1" />
              <Tab label="Edit Members" value="2" />
              <Tab label="Delete Members" value="3" />
            </TabList>
          </Box>
          <TabPanel
            value="1"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {" "}
            <h1 style={{ fontSize: 50, textAlign: "center" }}>
              DVHS Robotics Members Form
            </h1>
            <form>
              <div className="field" tabIndex={1}>
                <label htmlFor="username">
                  <i className="fa fa-user"></i>New Member's Name
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                  name="username"
                  type="text"
                  placeholder="e.g. john doe"
                  required
                />
              </div>
              <div className="field" tabIndex={2}>
                <label htmlFor="role">
                  <i className="fa fa-user"></i>Grade Level
                </label>
                <div className="select-dropdown" style={{ marginBottom: 0 }}>
                  <select
                    value={grade}
                    onChange={(e) => {
                      setGrade(e.target.value);
                    }}
                  >
                    {gradeOptions.map((t) => (
                      <option value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field" tabIndex={2}>
                <label htmlFor="role">
                  <i className="fa fa-pencil"></i>Role
                </label>
                <input
                  value={role}
                  onChange={(e) => setRole(e.currentTarget.value)}
                  name="role"
                  type="text"
                  placeholder="Builder/Prog"
                  required
                />
              </div>
              <div className="field" tabIndex={2} style={{ marginTop: 20 }}>
                <label htmlFor="role">
                  <i className="fa fa-user"></i>Team
                </label>
                <div className="select-dropdown">
                  <select
                    value={team}
                    onChange={(e) => {
                      setTeam(e.target.value);
                    }}
                  >
                    {teamOptions.map((t) => (
                      <option value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field" tabIndex={3}>
                <label htmlFor="imageurl">
                  <i className="fa fa-edit"></i>Member ImageURL
                </label>
                <textarea
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.currentTarget.value)}
                  name="imageurl"
                  placeholder="Add google drive image, or any other image link here..."
                  required
                ></textarea>
              </div>
              <button
                type="reset"
                style={{
                  backgroundColor:
                    username.length > 0 &&
                    imageUrl.length > 0 &&
                    role.length > 0
                      ? ""
                      : "gray",
                  cursor:
                    username.length > 0 &&
                    imageUrl.length > 0 &&
                    role.length > 0
                      ? ""
                      : "not-allowed",
                }}
                disabled={
                  username.length > 0 && imageUrl.length > 0 && role.length > 0
                    ? false
                    : true
                }
                onClick={() => {
                  setMembers([
                    ...members,
                    {
                      username,
                      role,
                      imageUrl,
                      team,
                      grade,
                    },
                  ]);
                  setUsername("");
                  setImageUrl("");
                  setRole("");
                  toast("Member Successfully Added", { type: "success" });
                }}
              >
                Submit
              </button>
            </form>
          </TabPanel>
          <TabPanel value="2">
            <div style={{ display: "flex", flexDirection: "row" }}>
              {members.map((m) => (
                <div
                  className="card"
                  style={{ marginRight: 40, marginLeft: 40 }}
                >
                  <img src={m.imageUrl} alt="" className="card__image" />
                  <p className="card__name">
                    {m.username} ({m.grade})
                  </p>
                  <div
                    className="grid-container"
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      bottom: 10,
                      position: "relative",
                    }}
                  >
                    {m.role}
                  </div>
                  <div
                    className="grid-container"
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    {m.team}
                  </div>
                  <button
                    className="btn draw-border"
                    onClick={() => {
                      handleOpen();
                      setModalData(m);
                    }}
                    style={{ backgroundColor: "#007bff" }}
                  >
                    Edit Member
                  </button>
                </div>
              ))}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <i
                    className="fa fa-close"
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      zoom: 1.2,
                      cursor: "pointer",
                    }}
                    onClick={handleClose}
                  />
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    style={{ fontSize: 20, fontWeight: 600 }}
                  >
                    {modalData?.username}
                  </Typography>
                  <form>
                    <div className="field" tabIndex={1}>
                      <label htmlFor="username">
                        <i className="fa fa-user"></i>Edit Member's Name
                      </label>
                      <input
                        value={editUsername}
                        onChange={(e) => setEditUsername(e.currentTarget.value)}
                        name="username"
                        type="text"
                        placeholder="e.g. john doe"
                        required
                      />
                    </div>
                    <div className="field" tabIndex={2}>
                      <label htmlFor="role">
                        <i className="fa fa-user"></i>Edit Grade Level
                      </label>
                      <div
                        className="select-dropdown"
                        style={{ marginBottom: 0 }}
                      >
                        <select
                          value={editGrade}
                          style={{ cursor: "pointer" }}
                          onChange={(e) => {
                            setEditGrade(e.target.value);
                          }}
                        >
                          {gradeOptions.map((t) => (
                            <option value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="field" tabIndex={2}>
                      <label htmlFor="role">
                        <i className="fa fa-pencil"></i>Role
                      </label>
                      <input
                        value={editRole}
                        onChange={(e) => setEditRole(e.currentTarget.value)}
                        name="role"
                        type="text"
                        placeholder="Builder/Prog"
                        required
                      />
                    </div>
                    <div
                      className="field"
                      tabIndex={2}
                      style={{ marginTop: 20 }}
                    >
                      <label htmlFor="role">
                        <i className="fa fa-user"></i>Team
                      </label>
                      <div className="select-dropdown">
                        <select
                          value={editTeam}
                          onChange={(e) => {
                            setEditTeam(e.target.value);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {teamOptions.map((t) => (
                            <option value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="field" tabIndex={3}>
                      <label htmlFor="imageurl">
                        <i className="fa fa-edit"></i>Member ImageURL
                      </label>
                      <textarea
                        value={editImageUrl}
                        onChange={(e) => setEditImageUrl(e.currentTarget.value)}
                        name="imageurl"
                        placeholder="Add google drive image, or any other image link here..."
                        required
                      ></textarea>
                    </div>
                    <button
                      type="reset"
                      style={{
                        backgroundColor:
                          editUsername &&
                          editUsername.length > 0 &&
                          editImageUrl &&
                          editImageUrl.length > 0 &&
                          editRole &&
                          editRole.length > 0
                            ? ""
                            : "gray",
                        cursor:
                          editUsername &&
                          editUsername.length > 0 &&
                          editImageUrl &&
                          editImageUrl.length > 0 &&
                          editRole &&
                          editRole.length > 0
                            ? ""
                            : "not-allowed",
                      }}
                      disabled={
                        editUsername &&
                        editUsername.length > 0 &&
                        editImageUrl &&
                        editImageUrl.length > 0 &&
                        editRole &&
                        editRole.length > 0
                          ? false
                          : true
                      }
                      onClick={() => {
                        const deleted = members.filter(
                          (m) => m.username !== modalData?.username
                        );
                        setMembers([
                          ...deleted,
                          {
                            username: editUsername,
                            role: editRole,
                            imageUrl: editImageUrl,
                            team: editTeam,
                            grade: editGrade,
                          },
                        ]);
                        handleClose();
                        toast("Member Successfully Edited", {
                          type: "success",
                        });
                      }}
                    >
                      Submit
                    </button>
                  </form>
                </Box>
              </Modal>
            </div>
          </TabPanel>
          <TabPanel value="3">
            <div style={{ display: "flex", flexDirection: "row" }}>
              {members.map((m) => (
                <div
                  className="card"
                  style={{ marginRight: 40, marginLeft: 40 }}
                >
                  <img src={m.imageUrl} alt="" className="card__image" />
                  <p className="card__name">
                    {m.username} ({m.grade})
                  </p>
                  <div
                    className="grid-container"
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      bottom: 10,
                      position: "relative",
                    }}
                  >
                    {m.role}
                  </div>
                  <div
                    className="grid-container"
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    {m.team}
                  </div>
                  <button
                    className="btn draw-border"
                    style={{ backgroundColor: "#dc3545" }}
                    onClick={() =>
                      setMembers(
                        members.filter(
                          (member) => member.username !== m.username
                        )
                      )
                    }
                  >
                    Delete Member
                  </button>
                </div>
              ))}
            </div>
          </TabPanel>
        </TabContext>
      </div>
    </>
  );
}
