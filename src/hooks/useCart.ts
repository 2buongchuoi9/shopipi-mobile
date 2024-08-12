import { CartContext } from '@/contexts/CartContext'
import { useContext } from 'react'

const useCart = () => useContext(CartContext)
export default useCart
