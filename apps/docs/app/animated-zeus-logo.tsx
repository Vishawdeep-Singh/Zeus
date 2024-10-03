import { Zap } from "lucide-react"

export default function AnimatedZeusLogo() {
  return (
    <div className="relative">
      <Zap className="h-8 w-8 text-yellow-500" />
      <div className="absolute inset-0 animate-pulse-fast">
        <Zap className="h-8 w-8 text-yellow-500 opacity-75" />
      </div>
      <div className="absolute inset-0 animate-pulse-slow">
        <Zap className="h-8 w-8 text-yellow-500 opacity-50" />
      </div>
    </div>
  )
}