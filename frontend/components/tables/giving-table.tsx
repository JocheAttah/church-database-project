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
    inflowId: "GIV001",
    type: "Facility Giving",
    amount: 560000,
    description: "Facility Giving for March 2024",
    date: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Samuel",
  },
  {
    id: 2,
    inflowId: "GIV001",
    type: "Offering",
    amount: 40000,
    description: "Sunday Offering",
    date: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Timothy",
  },
  {
    id: 3,
    inflowId: "GIV001",
    type: "Offering",
    amount: 40000,
    description: "Midweek Service Offering",
    date: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Attah",
  },
  {
    id: 4,
    inflowId: "GIV001",
    type: "Monthly Giving",
    amount: 40000,
    description: "Monthly Giving for February",
    date: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Oyinda",
  },
  {
    id: 5,
    inflowId: "GIV001",
    type: "Pastor's honorarium",
    amount: 40000,
    description: "Honourarium for January",
    date: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Timothy",
  },
  {
    id: 6,
    inflowId: "GIV001",
    type: "Facility Giving",
    amount: 40000,
    description: "Facility Giving for April 2024",
    date: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Oyinkan",
  },
  {
    id: 7,
    inflowId: "GIV001",
    type: "Facility Giving",
    amount: 40000,
    description: "Facility Giving for May 2024",
    date: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Timothy",
  },
  {
    id: 8,
    inflowId: "GIV001",
    type: "Offering",
    amount: 40000,
    description: "Fellowship Meeting Offering",
    date: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Timothy",
  },
  {
    id: 9,
    inflowId: "GIV001",
    type: "Offering",
    amount: 40000,
    description: "Midweek Service Offering",
    date: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Samuel",
  },
  {
    id: 10,
    inflowId: "GIV001",
    type: "Offering",
    amount: 40000,
    description: "Midweek Service Offering",
    date: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Samuel",
  },
];

const GivingTable = () => {
  return (
    <Table>
      <TableHeader className="bg-woodsmoke">
        <TableRow>
          <TableHead>S/N</TableHead>
          <TableHead>Inflow ID</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Date Created</TableHead>
          <TableHead>Created By</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((meeting, index) => (
          <TableRow key={index} className="even:bg-shark-darker">
            <TableCell>{index + 1}</TableCell>
            <TableCell>{meeting.inflowId}</TableCell>
            <TableCell>{meeting.type}</TableCell>
            <TableCell>{meeting.amount}</TableCell>
            <TableCell>{meeting.description}</TableCell>
            <TableCell>{meeting.date}</TableCell>
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
                    <Link href={`#`}>View Details</Link>
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

export default GivingTable;
