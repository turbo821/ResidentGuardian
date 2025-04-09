
const UserInfo = ({ user }) => {
  return (
    <div className="mt-8 bg-blue-50 p-6 rounded-lg">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
          {user?.email?.charAt(0).toUpperCase()}
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-gray-800">{user?.email}</h3>
          <p className="text-gray-600 mt-1">
            Статус: <span className="font-semibold text-green-600">Активный</span>
          </p>
          <p className="text-gray-600">
            Дата регистрации: <span className="font-semibold">01.01.2023</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserInfo;