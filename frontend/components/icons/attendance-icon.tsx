"use client";
import NavIconProps from "@/types/nav-icon-props";

const AttendanceIcon = ({ filled }: NavIconProps) => {
  return filled ? (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.006 3.70505C19.3953 3.56349 19.5961 3.13317 19.4546 2.7439C19.313 2.35462 18.8827 2.1538 18.4934 2.29536L5.99988 6.83846V3.00021C5.99988 2.58599 5.66409 2.25021 5.24988 2.25021H3.74988C3.33566 2.25021 2.99988 2.58599 2.99988 3.00021V7.92937L1.99341 8.29536C1.60413 8.43691 1.40332 8.86724 1.54487 9.25651C1.68643 9.64579 2.11675 9.8466 2.50602 9.70505L19.006 3.70505Z"
        className="text-pictonblue"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.01883 11.1147L17.9999 5.66708V9.08858L22.006 10.5454C22.3953 10.6869 22.5961 11.1172 22.4546 11.5065C22.313 11.8958 21.8827 12.0966 21.4934 11.955L20.9997 11.7755V20.2502H21.7499C22.1641 20.2502 22.4999 20.586 22.4999 21.0002C22.4999 21.4144 22.1641 21.7502 21.7499 21.7502H2.24988C1.83566 21.7502 1.49988 21.4144 1.49988 21.0002C1.49988 20.586 1.83566 20.2502 2.24988 20.2502H2.99988V11.1215L3.01883 11.1147ZM17.9999 20.2502V10.6847L19.4997 11.2301V20.2502H17.9999ZM8.99988 14.2502C8.58566 14.2502 8.24988 14.586 8.24988 15.0002V19.5002C8.24988 19.9144 8.58566 20.2502 8.99988 20.2502H11.9999C12.4141 20.2502 12.7499 19.9144 12.7499 19.5002V15.0002C12.7499 14.586 12.4141 14.2502 11.9999 14.2502H8.99988Z"
        className="text-pictonblue"
        fill="currentColor"
      />
    </svg>
  ) : (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.25 21V16.125C8.25 15.5037 8.75368 15 9.375 15H11.625C12.2463 15 12.75 15.5037 12.75 16.125V21M12.75 21H17.25V3.54545M12.75 21H20.25V10.75M2.25 21H3.75M21.75 21H3.75M2.25 9L6.75 7.36364M18.75 3L17.25 3.54545M17.25 9.75L20.25 10.75M21.75 11.25L20.25 10.75M6.75 7.36364V3H3.75V21M6.75 7.36364L17.25 3.54545"
        className="text-dustygray"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default AttendanceIcon;