"use client";

import Card from "@/components/card";
import ArrowSmallLeftIcon from "@/components/icons/arrow-small-left-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { useRouter } from "next/navigation";

type FellowshipCellMemberProps = {
  params: { name: string; "member-id": string };
};
const FellowshipCellMember = ({ params }: FellowshipCellMemberProps) => {
  const router = useRouter();

  const userData = {
    id: "USER00001",
    fName: "Jonathan",
    lName: "David",
    gender: "Male",
    marital: "Single",
    qualification: "Worker",
    "fellowship-cell": capitalizeFirstLetter(params.name),
    phone: "+2348112345678",
    email: "jonathan@gmail.com",
    dob: "23rd October, 1996",
    class: "Student",
    discipledBy: "Pastor",
  };

  const data = [
    { key: "User ID", value: userData.id },
    { key: "First Name", value: userData.fName },
    { key: "Last Name", value: userData.lName },
    { key: "Gender", value: userData.gender },
    { key: "Marital Status", value: userData.marital },
    { key: "Qualification", value: userData.qualification },
    { key: "Fellowship/Cell", value: userData["fellowship-cell"] },
    { key: "Phone", value: userData.phone },
    { key: "Email Address", value: userData.email },
    { key: "Date of Birth", value: userData.dob },
    { key: "Class", value: userData.class },
    { key: "Discipled By", value: userData.discipledBy },
  ];

  return (
    <div>
      <div
        className="mb-11 flex w-fit cursor-pointer items-center gap-1.5 self-end text-dustygray hover:underline"
        onClick={router.back}
      >
        <ArrowSmallLeftIcon />
        <p className="text-xs">Fellowships/Cells</p>
      </div>

      <Card className="p-10">
        <div className="mb-4 flex flex-wrap items-center gap-16">
          {data.map(({ key, value }, index) => (
            <div className="space-y-2" key={index}>
              <p className="text-sm text-dustygray">{key}</p>
              <p className="font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Edit User</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
              </DialogHeader>
              <div className="border-t border-mineshaft pt-7 text-white">
                alsdjfkajdl
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </div>
  );
};

export default FellowshipCellMember;
