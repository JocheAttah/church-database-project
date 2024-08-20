// components/MemberTable.js
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pill from "../pill";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ChevronDownIcon from "../icons/chevron-down-icon";
import Link from "next/link";

const data = [
  {
    id: 1,
    inflowId: "GIV001",
    type: "Facility Giving",
    amount: "₦560,000",
    description: "Facility Giving for March 2024",
    date: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Samuel",
  },
  {
    id: 2,
    inflowId: "GIV001",
    type: "Offering",
    amount: "₦40,000",
    description: "Sunday Offering",
    date: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Timothy",
  },
  {
    id: 3,
    inflowId: "GIV001",
    type: "Offering",
    amount: "₦40,000",
    description: "Midweek Service Offering",
    date: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Attah",
  },
  {
    id: 4,
    inflowId: "GIV001",
    type: "Monthly Giving",
    amount: "₦40,000",
    description: "Monthly Giving for February",
    date: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Oyinda",
  },
  {
    id: 5,
    inflowId: "GIV001",
    type: "Pastor’s honorarium",
    amount: "₦40,000",
    description: "Honourarium for January",
    date: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Timothy",
  },
  {
    id: 6,
    inflowId: "GIV001",
    type: "Facility Giving",
    amount: "₦40,000",
    description: "Facility Giving for April 2024",
    date: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Oyinkan",
  },
  {
    id: 7,
    inflowId: "GIV001",
    type: "Facility Giving",
    amount: "₦40,000",
    description: "Facility Giving for May 2024",
    date: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Timothy",
  },
  {
    id: 8,
    inflowId: "GIV001",
    type: "Offering",
    amount: "₦40,000",
    description: "Fellowship Meeting Offering",
    date: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Timothy",
  },
  {
    id: 9,
    inflowId: "GIV001",
    type: "Offering",
    amount: "₦40,000",
    description: "Midweek Service Offering",
    date: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Samuel",
  },
  {
    id: 10,
    inflowId: "GIV001",
    type: "Offering",
    amount: "₦40,000",
    description: "Midweek Service Offering",
    date: "11/03/2024",
    dateCreated: "11/03/2024",
    createdBy: "Samuel",
  },
];

export default function GivingTable() {
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
        {data.map((member, index) => (
          <TableRow key={member.id} className="even:bg-shark-darker">
            <TableCell>{index + 1}</TableCell>
            <TableCell>{member.inflowId}</TableCell>
            <TableCell>{member.type}</TableCell>
            <TableCell>{member.amount}</TableCell>
            <TableCell>{member.description}</TableCell>
            <TableCell>{member.date}</TableCell>
            <TableCell>{member.dateCreated}</TableCell>
            <TableCell>{member.createdBy}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                  <span>Actions</span>
                  <ChevronDownIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href={`membership/${member.id}`}>Edit</Link>
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
}
