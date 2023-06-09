import { Inter } from "next/font/google";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Typography } from "@mui/material";
import Card from "@/components/Card";
import Form from "@/components/Form";
import MemberType from "@/types/MemberType";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [value, setValue] = React.useState("1");
  const [members, setMembers] = useState<any[]>([]);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [teamOptions, _] = useState<
    ["5776A", "5776E", "5776K", "5776T", "5776X"]
  >(["5776A", "5776E", "5776K", "5776T", "5776X"]);
  const [gradeOptions, __] = useState<["9", "10", "11", "12"]>([
    "9",
    "10",
    "11",
    "12",
  ]);
  const [team, setTeam] = useState("5776A");
  const [grade, setGrade] = useState("9");
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<MemberType>();
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
            <h1 style={{ fontSize: 50, textAlign: "center" }}>
              DVHS Robotics Members Form
            </h1>
            <Form
              username={username}
              setUsername={setUsername}
              grade={grade}
              setGrade={setGrade}
              gradeOptions={gradeOptions}
              role={role}
              setRole={setRole}
              team={team}
              setTeam={setTeam}
              teamOptions={teamOptions}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              members={members}
              setMembers={setMembers}
            />
          </TabPanel>
          <TabPanel value="2">
            <div style={{ display: "flex", flexDirection: "row" }}>
              {members.length > 0 ? (
                <button
                  className="btn draw-border"
                  style={{
                    backgroundColor: "#28a745",
                    width: 200,
                    height: 60,
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                  onClick={() => {
                    let editedMembers = [];
                    let removeMembers = [];
                    for (const member of members) {
                      if (parseInt(member.grade) === 12) {
                        removeMembers = members.filter(
                          (m) => m.grade !== member.grade
                        );
                        setMembers(removeMembers);
                      } else {
                        editedMembers.push({
                          username: member.username,
                          role: member.role,
                          imageUrl: member.imageUrl,
                          team: member.team,
                          grade: (parseInt(member.grade) + 1).toString(),
                        });
                        setMembers(editedMembers);
                      }
                    }
                  }}
                >
                  Increase Grade Level
                </button>
              ) : (
                ""
              )}
              {members.map((member) => (
                <Card
                  member={member}
                  onClick={() => {
                    handleOpen();
                    setModalData(member);
                  }}
                  backgroundColor="#007bff"
                  text="Edit"
                />
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
              {members.map((member) => (
                <Card
                  text="Delete Member"
                  backgroundColor="#dc3545"
                  member={member}
                  onClick={() =>
                    setMembers(
                      members.filter((m) => m.username !== member.username)
                    )
                  }
                />
              ))}
            </div>
          </TabPanel>
        </TabContext>
      </div>
    </>
  );
}
