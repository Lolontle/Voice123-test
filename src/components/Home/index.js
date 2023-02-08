import React, { useState } from "react";
import { Heading, Flex, Input, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState(``);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleOnClick = () => {
    navigate(`/results/${value}/${1}`)
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleOnClick();
    }
  };
  return (
    <Flex direction={"column"}>
      <Heading>Voice123</Heading>
      <Flex direction={"row"}>
        <Input
          type="text"
          placeholder="Search here"
          value={value}
          onChange={handleChange}
        />
        <IconButton onClick={handleOnClick} onKeyPress={handleKeypress} />
      </Flex>
    </Flex>
  );
};

export default Home;
