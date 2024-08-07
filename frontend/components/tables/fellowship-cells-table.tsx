import Pill from "../pill";
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

const FellowshipCellsTable = () => {
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
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((member, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{member.firstName}</TableCell>
            <TableCell>{member.lastName}</TableCell>
            <TableCell>{member.gender}</TableCell>
            <TableCell>{member.phoneNumber}</TableCell>
            <TableCell>{member.membershipStatus}</TableCell>
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
            <TableCell>Actions</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FellowshipCellsTable;
