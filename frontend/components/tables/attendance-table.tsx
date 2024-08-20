import Link from "next/link";
import ChevronDownIcon from "../icons/chevron-down-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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
    meetingType: "Sunday Service",
    attendance: 1000,
    absentees: 35,
    meetingDate: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Samuel",
  },
  {
    id: 2,
    meetingType: "Sunday Service",
    attendance: 1000,
    absentees: 35,
    meetingDate: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Timothy",
  },
  {
    id: 3,
    meetingType: "Midweek Service",
    attendance: 1000,
    absentees: 35,
    meetingDate: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Attah",
  },
  {
    id: 4,
    meetingType: "Midweek Service",
    attendance: 1000,
    absentees: 35,
    meetingDate: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Oyinda",
  },
  {
    id: 5,
    meetingType: "Fellowship Meeting",
    attendance: 1000,
    absentees: 35,
    meetingDate: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Timothy",
  },
  {
    id: 6,
    meetingType: "Prayer Group",
    attendance: 1000,
    absentees: 35,
    meetingDate: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Oyinkan",
  },
  {
    id: 7,
    meetingType: "Midweek Service",
    attendance: 1000,
    absentees: 35,
    meetingDate: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Timothy",
  },
  {
    id: 8,
    meetingType: "Sunday Service",
    attendance: 1000,
    absentees: 35,
    meetingDate: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Samuel",
  },
  {
    id: 9,
    meetingType: "Sunday Service",
    attendance: 1000,
    absentees: 35,
    meetingDate: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Attah",
  },
  {
    id: 10,
    meetingType: "Midweek Service",
    attendance: 1000,
    absentees: 35,
    meetingDate: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Segun",
  },
];

const AttendanceTable = () => {
  return (
    <Table>
      <TableHeader className="bg-woodsmoke">
        <TableRow>
          <TableHead>S/N</TableHead>
          <TableHead>Meeting Type</TableHead>
          <TableHead>Attendance</TableHead>
          <TableHead>Absentees</TableHead>
          <TableHead>Meeting Date</TableHead>
          <TableHead>Date Created</TableHead>
          <TableHead>Created By</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((meeting, index) => (
          <TableRow key={index} className="even:bg-shark-darker">
            <TableCell>{index + 1}</TableCell>
            <TableCell>{meeting.meetingType}</TableCell>
            <TableCell>{meeting.attendance}</TableCell>
            <TableCell>{meeting.absentees}</TableCell>
            <TableCell>{meeting.meetingDate}</TableCell>
            <TableCell>{meeting.dateCreated}</TableCell>
            <TableCell>{meeting.createdBy}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                  <span>Actions</span>
                  <ChevronDownIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href={`${meeting.id}`}>View Details</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttendanceTable;
