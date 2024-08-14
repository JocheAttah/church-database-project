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
    firstName: "Samuel",
    lastName: "Samuel",
    gender: "Male",
    phoneNumber: "2348112345678",
    membershipStatus: "Worker in Training",
    cell: "Durumi",
    status: "Consistent",
  },
  {
    id: 2,
    firstName: "Deborah",
    lastName: "Deborah",
    gender: "Female",
    phoneNumber: "2348112345678",
    membershipStatus: "Member",
    cell: "Lokogoma",
    status: "Inconsistent",
  },
  {
    id: 3,
    firstName: "Timothy",
    lastName: "Timothy",
    gender: "Male",
    phoneNumber: "2348112345678",
    membershipStatus: "Worker in Training",
    cell: "Pigbakasa",
    status: "Consistent",
  },
  {
    id: 4,
    firstName: "Eniola",
    lastName: "Eniola",
    gender: "Female",
    phoneNumber: "2348112345678",
    membershipStatus: "Worker in Training",
    cell: "Wuse",
    status: "Inconsistent",
  },
  {
    id: 5,
    firstName: "Damilola",
    lastName: "Damilola",
    gender: "Female",
    phoneNumber: "2348112345678",
    membershipStatus: "Worker in Training",
    cell: "Jikwoyi",
    status: "Consistent",
  },
  {
    id: 6,
    firstName: "Attah",
    lastName: "Attah",
    gender: "Male",
    phoneNumber: "2348112345678",
    membershipStatus: "Member",
    cell: "Karu",
    status: "Consistent",
  },
  {
    id: 7,
    firstName: "Oluwaseun",
    lastName: "Oluwaseun",
    gender: "Female",
    phoneNumber: "2348112345678",
    membershipStatus: "Member",
    cell: "Karu",
    status: "Consistent",
  },
  {
    id: 8,
    firstName: "Kayode",
    lastName: "Kayode",
    gender: "Male",
    phoneNumber: "2348112345678",
    membershipStatus: "Member",
    cell: "Durumi",
    status: "Consistent",
  },
  {
    id: 9,
    firstName: "Ifechukwu",
    lastName: "Ifechukwu",
    gender: "Male",
    phoneNumber: "2348112345678",
    membershipStatus: "Member",
    cell: "Durumi",
    status: "Consistent",
  },
  {
    id: 10,
    firstName: "Blessing",
    lastName: "Blessing",
    gender: "Male",
    phoneNumber: "2348112345678",
    membershipStatus: "Member",
    cell: "Durumi",
    status: "Consistent",
  },
];

export default function MemberTable() {
  return (
    <Table>
      <TableHeader className="bg-woodsmoke">
        <TableRow>
          <TableHead>S/N</TableHead>
          <TableHead>First name</TableHead>
          <TableHead>Last name</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Phone number</TableHead>
          <TableHead>Membership Status</TableHead>
          <TableHead>Cell/Fellowship</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((member, index) => (
          <TableRow key={member.id} className="even:bg-shark-darker">
            <TableCell>{index + 1}</TableCell>
            <TableCell>{member.firstName}</TableCell>
            <TableCell>{member.lastName}</TableCell>
            <TableCell>{member.gender}</TableCell>
            <TableCell>{member.phoneNumber}</TableCell>
            <TableCell>{member.membershipStatus}</TableCell>
            <TableCell>{member.cell}</TableCell>
            <TableCell>
              {member.status === "Consistent" ? (
                <Pill>
                  <span className="text-greenhaze">{member.status}</span>
                </Pill>
              ) : (
                <Pill>
                  <span className="text-bourbon">{member.status}</span>
                </Pill>
              )}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                  <span>Actions</span>
                  <ChevronDownIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href={`membership/${member.id}`}>View Details</Link>
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
