import type { Selectors } from "@/app/dashboard/attendance/[meeting-id]/page";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const data = [
  {
    id: 1,
    attendance: "Olatomiwa Ogunsope",
    gender: "Female",
    cellFellowship: "Durumi",
    membershipStatus: "Worker in Training",
  },
  {
    id: 2,
    attendance: "Tayo Samson",
    gender: "Male",
    cellFellowship: "Wuse",
    membershipStatus: "Member",
  },
  {
    id: 3,
    attendance: "Tayo Samson",
    gender: "Male",
    cellFellowship: "Jikwoyi",
    membershipStatus: "Worker in Training",
  },
  {
    id: 4,
    attendance: "Tayo Samson",
    gender: "Male",
    cellFellowship: "Karu",
    membershipStatus: "Worker in Training",
  },
  {
    id: 5,
    attendance: "Tayo Samson",
    gender: "Male",
    cellFellowship: "Lokogoma",
    membershipStatus: "Member",
  },
  {
    id: 6,
    attendance: "Tayo Samson",
    gender: "Male",
    cellFellowship: "Kuje",
    membershipStatus: "Worker in Training",
  },
  {
    id: 7,
    attendance: "Tayo Samson",
    gender: "Male",
    cellFellowship: "Lugbe",
    membershipStatus: "Worker in Training",
  },
  {
    id: 8,
    attendance: "Tayo Samson",
    gender: "Male",
    cellFellowship: "Durumi",
    membershipStatus: "Member",
  },
  {
    id: 9,
    attendance: "Tayo Samson",
    gender: "Male",
    cellFellowship: "Lokogoma",
    membershipStatus: "Worker in Training",
  },
  {
    id: 10,
    attendance: "Tayo Samson",
    gender: "Male",
    cellFellowship: "Karu",
    membershipStatus: "Worker in Training",
  },
];

const AttendanceMeetingTable = ({ selected }: { selected: Selectors }) => {
  return (
    <Table>
      <TableHeader className="bg-woodsmoke">
        <TableRow>
          <TableHead>S/N</TableHead>
          <TableHead>Attendance</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Cell/Fellowship</TableHead>
          <TableHead>Membership Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((meeting, index) => (
          <TableRow key={index} className="even:bg-shark-darker">
            <TableCell>{index + 1}</TableCell>
            <TableCell>{meeting.attendance}</TableCell>
            <TableCell>{meeting.gender}</TableCell>
            <TableCell>{meeting.cellFellowship}</TableCell>
            <TableCell>
              {selected === "workers"
                ? "Worker in Training"
                : selected === "members-disciples"
                  ? "Member"
                  : meeting.membershipStatus}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttendanceMeetingTable;
