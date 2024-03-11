"use client";
import { AlertDialog, Button, Flex, TextField } from "@radix-ui/themes";
import { FaSearch } from "react-icons/fa";

const SearchModal = () => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <FaSearch />
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Search</AlertDialog.Title>
        <TextField.Root>
          <TextField.Slot>
            <FaSearch height="16" width="16" />
          </TextField.Slot>
          <TextField.Input placeholder="Search news" />
        </TextField.Root>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button>Search</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default SearchModal;
