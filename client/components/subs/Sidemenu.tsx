import React, {  useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { FiMenu } from "react-icons/fi";


export default function Sidemenu(): JSX.Element {
  const [visibleTop, setVisibleTop] = useState<boolean>(false);
  return (
    <div className="sidemenu">
      <Button icon={<FiMenu />} onClick={() => setVisibleTop(true)} className="bg-white hover:bg-gray-200 border-none"/>
      <Sidebar
        visible={visibleTop}
        position="top"
        onHide={() => setVisibleTop(false)}
      >
        <h2>Top Sidebar</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </Sidebar>
    </div>
  );
}
