"use client";

import BackButton from "@/components/back-button";
import Member from "@/components/member";

type MembershipMemberProps = {
  params: { name: string; "member-id": string };
};
const MembershipMember = ({ params }: MembershipMemberProps) => {
  return (
    <>
      <BackButton text="Membership" />
      <Member id={params["member-id"]} />
    </>
  );
};

export default MembershipMember;
