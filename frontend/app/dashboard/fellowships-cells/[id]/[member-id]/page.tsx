"use client";

import BackButton from "@/components/back-button";
import Member from "@/components/member";

type FellowshipCellMemberProps = {
  params: { name: string; "member-id": string };
};
const FellowshipCellMember = ({ params }: FellowshipCellMemberProps) => {
  return (
    <>
      <BackButton text="Fellowships/Cells" />
      <Member id={params["member-id"]} />
    </>
  );
};

export default FellowshipCellMember;
