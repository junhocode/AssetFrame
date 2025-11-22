import { useQuery } from "@tanstack/react-query"
import * as S from "./SystemStatus.styles"

export const SystemStatus = () => {
  const { data: isConnected } = useQuery({
    queryKey: ['ws-status'],
    queryFn: () => false,
    initialData: false,
    staleTime: Infinity,
    gcTime: Infinity
  })

  return (
    <div className={S.statusContainer}>
        <span className={S.text}>system status</span>
        {isConnected
        ? <div className={S.connectedIcon}></div>
        : <div className={S.disconnectedIcon}></div>}
    </div>
  )
};