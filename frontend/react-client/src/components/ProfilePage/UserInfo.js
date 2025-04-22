
const UserInfo = ({ user }) => {
  const createdDate = (new Date(user?.createdAt)).toLocaleDateString();

  return (
    <div className="mt-8 bg-blue-50 p-6 rounded-lg">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
          {user?.fullName?.charAt(0).toUpperCase()}
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-gray-800">{user?.fullName}</h3>
          <p className="text-gray-600 mt-1">
            Почта: <span className="font-semibold">{user?.email}</span>
          </p>
          <p className="text-gray-600">
            Дата регистрации: <span className="font-semibold">{createdDate}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserInfo;