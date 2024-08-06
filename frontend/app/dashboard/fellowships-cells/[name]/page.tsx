"use client";

type FellowshipCellNameProps = { params: { name: string } };

const FellowshipCellName = ({ params }: FellowshipCellNameProps) => {
  return <div>{params.name}</div>;
};

export default FellowshipCellName;
