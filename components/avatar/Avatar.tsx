import React, { forwardRef } from "react"

interface AvatarProps {
  letter: string
  className?: string
}

// Dùng forwardRef để chuyển tiếp ref từ DropdownMenuTrigger
const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ letter, className }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-semibold text-lg cursor-pointer ${className}`}
      >
        {letter.toUpperCase()}
      </div>
    )
  }
)

Avatar.displayName = "Avatar" // Đặt tên hiển thị để tránh cảnh báo khi debug

export default Avatar
