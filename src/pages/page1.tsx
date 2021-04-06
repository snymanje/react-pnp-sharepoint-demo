import { useEffect } from "react";
import { useSharePoint } from "../hooks/useSharePoint";

const Page1 = () => {
  const { spData } = useSharePoint();

  useEffect(() => {
    console.log(spData);
  });
  return (
    <div>
      {spData.map((item) => (
        <div>
          <p>{item.Title}</p>
          <p>{item.ID}</p>
        </div>
      ))}
    </div>
  );
};

export default Page1;
