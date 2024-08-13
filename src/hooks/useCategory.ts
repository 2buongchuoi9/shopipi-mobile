import { CategoryContext } from "@/contexts/CategoryContext"
import { useContext } from "react"

const useCategory = () => useContext(CategoryContext)
export default useCategory
