import { Input } from "antd";
import Image from "next/image";

type Props = {
  handleSetSearch: (val: string) => void;
};
const Search = ({ handleSetSearch }: Props) => {
  return (
    <Input
      style={{ border: "1px solid #D8E9E4" }}
      className="w-[535px] h-[40px]"
      variant="borderless"
      prefix={
        <Image
          src="/black/search.svg"
          width={24}
          height={24}
          alt="search logo"
        />
      }
      placeholder={`Search`}
      onChange={(e) => handleSetSearch(e.target.value)}
    />
  );
};

export default Search;
