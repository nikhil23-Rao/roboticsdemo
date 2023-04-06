import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(members);
  }, [members]);

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
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </div>
    </>
  );
}
