import { useAtomValue } from "jotai";
import { wsStatusAtom } from "@/atoms/wsStatusAtom";
import * as S from "./SystemStatus.styles";

export const SystemStatus = () => {
  const status = useAtomValue(wsStatusAtom);

  return (
    <div className={S.statusContainer}>
      <span className={S.text}>system status</span>
      {status === "connected" ? (
        <div className="relative">
          <div className={S.connectedIconPing}></div>
          <div className={S.connectedIcon}></div>
        </div>
      ) : status === "connecting" ? (
        <div className={S.connectingIcon}></div>
      ) : (
        <div className={S.disconnectedIcon}></div>
      )}
    </div>
  );
};