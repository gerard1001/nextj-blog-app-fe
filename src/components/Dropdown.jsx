import React from "react";
import { Menu, Dropdown } from "antd";

const DropdownContent = () => {
  return (
    <Menu>
      <Menu.Item key="1">Option 1</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
      <Menu.Item key="3">Option 3</Menu.Item>
    </Menu>
  );
};

const HoverableDropdown = () => {
  return (
    <Dropdown overlay={<DropdownContent />} trigger={["hover"]}>
      <a className="ant-dropdown-link">Hover me</a>
    </Dropdown>
  );
};

export default HoverableDropdown;
