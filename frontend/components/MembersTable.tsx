// components/MemberTable.js
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <TableHeader className="bg-[#151618]">
        <TableRow>
          <TableCell>S/N</TableCell>
          <TableCell>First name</TableCell>
          <TableCell>Last name</TableCell>
          <TableCell>Gender</TableCell>
          <TableCell>Phone number</TableCell>
          <TableCell>Membership Status</TableCell>
          <TableCell>Cell/Fellowship</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((member, index) => (
          <TableRow key={member.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{member.firstName}</TableCell>
            <TableCell>{member.lastName}</TableCell>
            <TableCell>{member.gender}</TableCell>
            <TableCell>{member.phoneNumber}</TableCell>
            <TableCell>{member.membershipStatus}</TableCell>
            <TableCell>{member.cell}</TableCell>
            <TableCell>
              {member.status === "Consistent" ? (
                <span className="text-green-500">{member.status}</span>
              ) : (
                <span className="text-red-500">{member.status}</span>
              )}
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
