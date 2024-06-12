"use client";
import NavIconProps from "@/types/nav-icon-props";

const ReportsIcon = ({ filled }: NavIconProps) => {
  return filled ? (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.25 2.25C2.05109 2.25 1.86032 2.32902 1.71967 2.46967C1.57902 2.61032 1.5 2.80109 1.5 3C1.5 3.19891 1.57902 3.38968 1.71967 3.53033C1.86032 3.67098 2.05109 3.75 2.25 3.75H3V14.25C3 15.0456 3.31607 15.8087 3.87868 16.3713C4.44129 16.9339 5.20435 17.25 6 17.25H7.21L6.038 20.763C5.97514 20.9518 5.98988 21.1579 6.07896 21.3359C6.16804 21.5138 6.32417 21.6491 6.513 21.712C6.70183 21.7749 6.9079 21.7601 7.08588 21.671C7.26385 21.582 7.39914 21.4258 7.462 21.237L7.791 20.25H16.209L16.539 21.237C16.6073 21.4186 16.7433 21.5666 16.9184 21.6501C17.0935 21.7335 17.2941 21.7459 17.4782 21.6845C17.6622 21.6232 17.8153 21.4929 17.9053 21.3211C17.9954 21.1493 18.0153 20.9492 17.961 20.763L16.791 17.25H18C18.7956 17.25 19.5587 16.9339 20.1213 16.3713C20.6839 15.8087 21 15.0456 21 14.25V3.75H21.75C21.9489 3.75 22.1397 3.67098 22.2803 3.53033C22.421 3.38968 22.5 3.19891 22.5 3C22.5 2.80109 22.421 2.61032 22.2803 2.46967C22.1397 2.32902 21.9489 2.25 21.75 2.25H2.25ZM8.29 18.75L8.79 17.25H15.21L15.71 18.75H8.29ZM15.75 6.75C15.75 6.55109 15.671 6.36032 15.5303 6.21967C15.3897 6.07902 15.1989 6 15 6C14.8011 6 14.6103 6.07902 14.4697 6.21967C14.329 6.36032 14.25 6.55109 14.25 6.75V12.75C14.25 12.9489 14.329 13.1397 14.4697 13.2803C14.6103 13.421 14.8011 13.5 15 13.5C15.1989 13.5 15.3897 13.421 15.5303 13.2803C15.671 13.1397 15.75 12.9489 15.75 12.75V6.75ZM12.75 9C12.75 8.80109 12.671 8.61032 12.5303 8.46967C12.3897 8.32902 12.1989 8.25 12 8.25C11.8011 8.25 11.6103 8.32902 11.4697 8.46967C11.329 8.61032 11.25 8.80109 11.25 9V12.75C11.25 12.9489 11.329 13.1397 11.4697 13.2803C11.6103 13.421 11.8011 13.5 12 13.5C12.1989 13.5 12.3897 13.421 12.5303 13.2803C12.671 13.1397 12.75 12.9489 12.75 12.75V9ZM9.75 11.25C9.75 11.0511 9.67098 10.8603 9.53033 10.7197C9.38968 10.579 9.19891 10.5 9 10.5C8.80109 10.5 8.61032 10.579 8.46967 10.7197C8.32902 10.8603 8.25 11.0511 8.25 11.25V12.75C8.25 12.9489 8.32902 13.1397 8.46967 13.2803C8.61032 13.421 8.80109 13.5 9 13.5C9.19891 13.5 9.38968 13.421 9.53033 13.2803C9.67098 13.1397 9.75 12.9489 9.75 12.75V11.25Z"
        fill="#30CB5A"
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
        d="M3.75 3V14.25C3.75 15.4926 4.75736 16.5 6 16.5H8.25M3.75 3H2.25M3.75 3H20.25M20.25 3H21.75M20.25 3V14.25C20.25 15.4926 19.2426 16.5 18 16.5H15.75M8.25 16.5H15.75M8.25 16.5L7.25 19.5M15.75 16.5L16.75 19.5M16.75 19.5L17.25 21M16.75 19.5H7.25M7.25 19.5L6.75 21M9 11.25V12.75M12 9V12.75M15 6.75V12.75"
        className="text-dustygray"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ReportsIcon;
