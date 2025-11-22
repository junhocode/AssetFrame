import { useQuery } from "@tanstack/react-query"

const SystemStatus = () => {
  const { data: isConnected } = useQuery({
    queryKey: ['ws-status'],
    queryFn: () => false,
    initialData: false,
    staleTime: Infinity,
    gcTime: Infinity
  })

  return (
    <div className="flex justify-center items-center gap-2">
        <span>system status:</span>
        {isConnected
        ? <div className="w-2 h-2 rounded-full bg-green-500"></div>
        : <div className="w-2 h-2 rounded-full bg-red-500"></div>}
    </div>
  )
}

export default SystemStatus