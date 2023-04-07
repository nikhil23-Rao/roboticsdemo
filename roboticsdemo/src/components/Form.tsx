import React from "react";
import SubmitButton from "./SubmitButton";
import { toast } from "react-toastify";
import MemberType from "@/types/MemberType";

interface IProps {
  username: string;
  setUsername: (e: any) => void;
  grade: string;
  setGrade: (e: any) => void;
  gradeOptions: ["9", "10", "11", "12"];
  role: string;
  setRole: (e: any) => void;
  team: string;
  setTeam: (e: any) => void;
  teamOptions: ["5776A", "5776E", "5776K", "5776T", "5776X"];
  imageUrl: string;
  setImageUrl: (e: any) => void;
  members: Array<MemberType>;
  setMembers: (arr: Array<MemberType>) => void;
}

const Form = ({
  username,
  setUsername,
  grade,
  setGrade,
  gradeOptions,
  role,
  setRole,
  team,
  setTeam,
  teamOptions,
  imageUrl,
  setImageUrl,
  members,
  setMembers,
}: IProps) => {
  return (
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
            {gradeOptions.map((g) => (
              <option value={g}>{g}</option>
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
      <SubmitButton
        username={username}
        role={role}
        imageUrl={imageUrl}
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
      />
    </form>
  );
};

export default Form;
