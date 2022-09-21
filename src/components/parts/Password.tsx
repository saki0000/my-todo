import { Box, PasswordInput, Popover, Progress, Text } from "@mantine/core";
import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

type props = {
  password: string;
  setPassword: (arg: string) => void;
};
const PasswordRequirement = ({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) => {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <AiOutlineCheck size={14} /> : <AiOutlineClose size={14} />}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
};
const Password = ({ password, setPassword }: props) => {
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <div className="w-70">
      <Popover opened={opened} position="top" width="target" transition="pop">
        <Popover.Target>
          <div
            onFocusCapture={() => setOpened(true)}
            onBlurCapture={() => setOpened(false)}
          >
            <PasswordInput
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              required
              style={{ width: 180 }}
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          {/* <Progress color={color} value={strength} size={5} style={{ marginBottom: 10 }} /> */}
          <PasswordRequirement
            label="Includes at least 6 characters"
            meets={password.length > 5}
          />
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default Password;
