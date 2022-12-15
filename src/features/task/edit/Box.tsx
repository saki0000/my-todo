import { Select } from "@mantine/core";
import React from "react";
import { Controller } from "react-hook-form";
import { boxType } from "../../../Types";

// eslint-disable-next-line no-empty-pattern
type box = { taskBox?: boxType; control?: any };

const Box = React.forwardRef(({ taskBox, control }: box) => {
  return (
    <div>
      <Controller
        name="box"
        control={control}
        render={({ field }) => (
          <Select
            data={[
              { value: "inbox", label: "Inbox" },
              { value: "nextAction", label: "Next Action List" },
              { value: "calendar", label: "Calendar" },
              { value: "someday", label: "Someday" },
            ]}
            {...field}
          />
        )}
      />
    </div>
  );
});

export default Box;
