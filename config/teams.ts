export interface Team {
  id: string
  name: string
  icon: string
  color: string
}

export const teamsConfig: Team[] = [
  {
    id: "medhassu",
    name: "Medhassu",
    icon: "🎓",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "tech-hub",
    name: "Tech Hub",
    icon: "💻",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "design-lab",
    name: "Design Lab",
    icon: "🎨",
    color: "from-orange-500 to-red-500",
  },
]
