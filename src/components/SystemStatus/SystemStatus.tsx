import { useAtomValue } from "jotai";
import { wsStatusAtom } from "@/atoms/wsStatusAtom";
import * as S from "./SystemStatus.styles";

export const SystemStatus = () => {
  const isConnected = useAtomValue(wsStatusAtom);


  return (
    <div className={S.statusContainer}>
      <span className={S.text}>system status</span>
      {isConnected
        ?
        <div className="relative">
          <div className={S.connectedIconPing}></div>
          <div className={S.connectedIcon}></div>
        </div>
        :
        <div className={S.disconnectedIcon}></div>
      }
    </div>
  )
};