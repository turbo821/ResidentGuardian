import { imagesURL } from "../../api";
import PropTypes from 'prop-types';

const UploadImage = ({ 
  fileInputRef, 
  handleImageUpload, 
  images,
  image=null, 
  removeImage,
  multiple = true,
  maxFiles = 5,
  label = "Фотографии",
  helperText = "PNG, JPG, JPEG"
}) => {
  return (
    <>
      <label className="block">
        <span className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {multiple && maxFiles && (
            <span className="text-gray-500 text-xs font-normal ml-1">
              (максимум {maxFiles})
            </span>
          )}
        </span>
        
        <div className="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            
            <div className="flex text-sm text-gray-600 justify-center">
              <label className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                <span>Загрузить {multiple ? 'фото' : 'фотографию'}</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple={multiple}
                  onChange={handleImageUpload}
                  className="sr-only"
                />
              </label>
              <p className="pl-1">или перетащите сюда</p>
            </div>
            
            <p className="text-xs text-gray-500">
              {helperText}
            </p>
          </div>
        </div>
      </label>

      {images && images.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            {multiple ? 'Выбранные фото:' : 'Выбранная фотография:'}
          </h3>
          <div className={`grid ${multiple ? 'grid-cols-3' : 'grid-cols-1'} gap-2`}>
            {images.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={typeof img === 'string' ? `${imagesURL}/${img}` : URL.createObjectURL(img)}
                  alt={`Preview ${index}`}
                  className="h-24 w-full object-cover rounded-lg border border-gray-200"
                />
                {multiple && (
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {image && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            {multiple ? 'Выбранные фото:' : 'Выбранная фотография:'}
          </h3>
          <div className={`grid grid-cols-1 gap-2`}>
            <div className="relative group m-auto">
              <img
                src={typeof img === 'string' ? `${imagesURL}/${image}` : URL.createObjectURL(image)}
                alt={`Preview 1`}
                className="h-24 w-full object-cover rounded-lg border border-gray-200"
              />
              {multiple && (
                <button
                  type="button"
                  onClick={() => removeImage()}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

UploadImage.propTypes = {
  fileInputRef: PropTypes.object.isRequired,
  handleImageUpload: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  removeImage: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  maxFiles: PropTypes.number,
  label: PropTypes.string,
  helperText: PropTypes.string
};

export default UploadImage;