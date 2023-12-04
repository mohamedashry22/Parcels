import {
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
    User
} from "@nextui-org/react";
import React from "react";
import { columns, users } from "./data";

type Status = "active" | "paused" | "vacation";

interface User {
  id: string;
  name: string;
  role: string;
  team: string;
  status: Status | string;
  age: string;
  avatar: string;
  email: string;
  [key: string]: string | undefined;
}

const statusColorMap: {
  [key in Status]:
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
} = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

type UserColumnKey =
  | "name"
  | "email"
  | "avatar"
  | "role"
  | "team"
  | "status"
  | "actions"; // Add all valid keys here

export default function TableComp() {
  const renderCell = React.useCallback(
    (user: User, columnKey: UserColumnKey) => {
      const cellValue = user[columnKey] as string;

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: user.avatar }}
              description={user.email}
              name={cellValue}
            >
              {user.email}
            </User>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
              <p className="text-bold text-sm capitalize text-default-400">
                {user.team}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user.status as Status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Button color="success" >
                    Pick a Parcel
                  </Button>
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey as UserColumnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
