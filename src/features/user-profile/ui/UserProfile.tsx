import { Avatar } from '@nextui-org/react'
import { UserDropdown } from '@/entities/user'
import { useAuth } from '@/auth/model/hooks'

interface UserProfileProps {
  logoutComponent?: React.ReactNode
  settingsComponent?: React.ReactNode
}

const UserProfile = ({
  logoutComponent,
  settingsComponent,
}: UserProfileProps) => {
  const { user } = useAuth()
  return (
    <UserDropdown
      trigger={
        <Avatar
          className="ml-4 cursor-pointer h-[30px] w-[30px] select-none"
          isBordered
          color="primary"
          name={user?.name}
          size="sm"
        />
      }
      renderItems={() => (
        <>
          {settingsComponent}
          {logoutComponent}
        </>
      )}
    />
  )
}

export default UserProfile
