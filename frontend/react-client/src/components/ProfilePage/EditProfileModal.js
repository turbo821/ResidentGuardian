import { isValidEmail } from "../../functions/textFunctions";
import { useState } from "react";
import toast from "react-hot-toast";

const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: user?.fullName,
    email: user?.email,
    currentPassword: '',
    newPassword:  '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Имя обязательно';
    }
    
    if(!formData.email.trim()) {
      newErrors.email = "Укажите почту!";
    }
    if(formData.email && !isValidEmail(formData.email)) {
      newErrors.email = "Неверный формат почты!";
    }
    
    if (formData.newPassword && !formData.currentPassword.trim()) {
      newErrors.currentPassword = 'Текущий пароль обязателен для смены пароля';
    }
    
    if(formData.currentPassword && formData.currentPassword.length < 6) {
      newErrors.currentPassword = "Пароль слишком короткий!";
    }

    if (formData.currentPassword && 
        (formData.newPassword !== formData.confirmPassword)) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    if(formData.currentPassword && 
        (formData.newPassword.length < 6 || formData.confirmPassword.length < 6)) {
      newErrors.confirmPassword = "Пароль слишком короткий!";
      newErrors.newPassword = "Пароль слишком короткий!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    setErrors({});
    setFormData({
      fullName: user.fullName,
      email: user.email,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    onClose();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      await onSave({
        fullName: formData.fullName,
        email: formData.email,
        currentPassword: formData?.currentPassword,
        newPassword: formData?.newPassword
      });
      handleClose();
    } catch (error) {
        toast.error('Ошибка при обновлении профиля', { duration: 2000 });
        setErrors({currentPassword: "Неправильные данные"});
    } finally {
        setIsLoading(false);
        setFormData({
          fullName: user?.fullName,
          email: user?.email,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Редактировать профиль</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ФИО</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Текущий пароль</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.currentPassword ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Введите текущий пароль"
                />
                {errors.currentPassword && <p className="mt-1 text-sm text-red-500">{errors.currentPassword}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Новый пароль</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Оставьте пустым, если не хотите менять"
                />
                {errors.newPassword && <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>}
              </div>

              {formData.newPassword && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Подтвердите новый пароль</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;