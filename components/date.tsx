import { parseISO, format } from "date-fns";
import React from "react";

type Props = {
  dateString: string;
};

const Date: React.FC<Props> = ({ dateString }) => {
  const date = parseISO(dateString);

  return (
    <time dateTime={dateString}>{format(date, "yyyy-MM-dd HH:mm:ss")}</time>
  );
};
export default Date;
