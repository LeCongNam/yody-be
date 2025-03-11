// redux/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import type { AppDispatch, RootState } from "./store"

// Sử dụng thay cho `useDispatch`
export const useAppDispatch: () => AppDispatch = useDispatch

// Sử dụng thay cho `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
