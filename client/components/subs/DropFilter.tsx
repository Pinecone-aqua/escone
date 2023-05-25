/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import Filter from "./Filter";

export default function DropFilter({ status }: any) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <div className="drop-filter">
        <button onClick={() => setVisible(true)} className="filter">
          <TbAdjustmentsHorizontal />
        </button>
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <Filter status={status} />
        </Sidebar>
      </div>
    </>
  );
}
